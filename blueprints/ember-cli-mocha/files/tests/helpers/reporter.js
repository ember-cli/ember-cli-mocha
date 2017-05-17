/*
 * A Mocha reporter meant to be used with ember-cli-mocha and ember-cli-blanket
 *
 * Based on Edward Faulnker's better-mocha-html-reporter:
 * <https://github.com/ef4/better-mocha-html-reporter>
 */

// Grab our own Date reference in case Sinon alters it later.
// var _Date = Date;

const template = `<h1 id='test-title'></h1>
<ul id="mocha-stats">
  <li class="progress"><canvas width="40" height="40"></canvas></li>
  <li class="test-option">
    <label>
      <input type="checkbox" id="enable-coverage"> Enable coverage
    </label>
  </li>
  <li class="test-option">
    <label>
      <input type="checkbox" id="hide-passed"> Hide passed
    </label>
  </li>
  <li class="passes">passes: <em class="value">0</em></li>
  <li class="failures">failures: <em class="value">0</em></li>
  <li class="duration">duration: <em class="value">0</em>s</li>
</ul>
<ul id="mocha-report"></ul>`;

export default class Reporter {

  constructor(runner) {
    this.passes = 0;
    this.failures = 0;
    this.runner = runner;

    this.setupDOM();
    this.setupEvents(runner);
    this.setupBlanket();
  }

  setupDOM() {
    const $rootNode = $('#mocha');

    if (!$rootNode) {
      throw new Error('#mocha missing, ensure it is in your document');
    }

    $rootNode.append(template);

    $('#test-title').text(document.title);

    this.setupCanvas();

    this.$stats = $('#mocha-stats');
    this.stack = [$('#mocha-report')];

    this.$stats.find('#hide-passed')
    .attr('checked', /hide_passed/.test(window.location.hash))
    .on('change', () => this.updateHidePassed());

    this.updateHidePassed();

    this.$stats.find('#enable-coverage')
    .attr('checked', /coverage/.test(window.location.search))
    .on('change', () => this.updateCoverageEnabled());

    this.updateCoverageEnabled();
  }

  setupEvents(runner) {
    function handlerForEvent(event) {
      // e.g., "suite end" => "onSuiteEnd"
      return `on ${event}`.replace(/ [\w]/g, (m) => m[1].toUpperCase());
    }

    const events = [
      'start',        // execution of testing started
      'end',          // execution of testing ended
      'suite',        // execution of a test suite started
      'suite end',    // execution of a test suite ended
      'test',         // execution of a test started
      'test end',     // execution of a test ended
      'hook',         // execution of a hook started
      'hook end',     // execution of a hook ended
      'pass',         // execution of a test ended in pass
      'fail',         // execution of a test ended in fail
      'pending'
    ];
    events.forEach((event) => {
      const reporter = this;
      runner.on(event, function(/* arguments */) {
        let handler = reporter[handlerForEvent(event)];
        if (handler) {
          handler.apply(reporter, arguments);
        }
      });
    });
  }

  setupBlanket() {
    if (!window.blanket) {
      return;
    }
    const { blanket } = window;
    const { onTestsDone: origOnTestsDone } = blanket;

    blanket.onTestsDone = () => {
      origOnTestsDone.apply(blanket);
      this.onBlanketDone();
    };
  }

  setupCanvas() {
    const ratio = window.devicePixelRatio || 1;

    this.canvas = $('.progress canvas')[0];
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(ratio, ratio);
  }

  updateDuration() {
    const seconds = (new Date() - this.startedAt) / 1000;
    this.$stats.find('.duration .value').text(seconds.toFixed(2));
  }

  updateProgress() {
    try {
      const totalTests = this.passes + this.failures;
      const progress = totalTests / this.runner.total * 100 | 0;
      const percent = Math.min(progress, 100);
      const angle = Math.PI * 2 * (percent / 100);

      const { canvas: { clientWidth: size } } = this;
      const halfSize = size / 2;
      const rad = halfSize - 1;
      const fontSize = 11;
      const { ctx } = this;

      const quarterCircle = 0.5 * Math.PI;

      ctx.font = `${fontSize}px helvetica, arial, sans-serif`;

      ctx.clearRect(0, 0, size, size);

      // outer circle
      ctx.strokeStyle = '#9f9f9f';
      ctx.beginPath();
      ctx.arc(halfSize, halfSize, rad, -quarterCircle, angle - quarterCircle, false);
      ctx.stroke();

      // inner circle
      ctx.strokeStyle = '#eee';
      ctx.beginPath();
      ctx.arc(halfSize, halfSize, rad - 1, -quarterCircle, angle - quarterCircle, true);
      ctx.stroke();

      // text
      const text = `${(percent | 0)}%`;
      const textWidth = ctx.measureText(text).width;

      ctx.fillText(text, halfSize - textWidth / 2 + 1, halfSize + fontSize / 2 - 1);
    } catch (err) {
      // don't fail if we can't render progress
    }
  }

  updateHidePassed() {
    if (this.$stats.find('#hide-passed').is(':checked')) {
      $('#mocha-report').addClass('hide-passed');
      $('#blanket-main').addClass('hide-passed');
      window.location.hash = '#hide_passed';
    } else {
      $('#mocha-report').removeClass('hide-passed');
      $('#blanket-main').removeClass('hide-passed');
      window.location.hash = '#';
    }
  }

  updateCoverageEnabled() {
    if (this.$stats.find('#enable-coverage').is(':checked')) {
      if (!/[?&]coverage/.test(window.location.search)) {
        window.location.search = '?coverage';
      }
    } else {
      if (/[?&]coverage/.test(window.location.search)) {
        window.location.search = '';
      }
    }
  }

  setMood(mood) {
    this.$stats.removeClass(this.mood);

    this.mood = mood;
    this.$stats.addClass(mood);
    setFavicon(mood);
  }

  onStart() {
    this.startedAt = new Date();
  }

  onEnd() {
    if (this.mood !== 'sad') {
      this.setMood('happy');
    }

    groupJSHint();
  }

  onSuite(suite) {
    if (suite.root) {
      return;
    }

    const title = suite.fullTitle();
    const $fragment = $('<li class="suite"><h1><a></a></h1><ul></ul></li>');

    $fragment.find('a').text(suite.title).attr('href', grepUrl(title));

    this.stack[0].append($fragment);
    this.stack.unshift($fragment.find('ul'));
  }

  onSuiteEnd(suite) {
    if (suite.root) {
      return;
    }

    const $ul = this.stack.shift();

    if ($ul.find('.fail').length > 0) {
      $ul.parent().addClass('fail');
    } else {
      $ul.parent().addClass('pass');
    }
  }

  onTestEnd(test) {
    this.updateDuration();

    const $fragment = fragmentForTest(test);

    if (!this.stack[0]) {
      const $report = $('#mocha-report');
      $report.append('<li class="suite"><h1></h1><ul></ul></li>');
      $report.find('h1').text('ORPHAN TESTS');
      this.stack.unshift($report.find('ul'));
    }

    this.stack[0].append($fragment);

    this.updateProgress();
  }

  onPass() {
    this.passes++;
    this.$stats.find('.passes .value').text(this.passes);
  }

  onFail(test, err) {
    this.failures++;
    this.$stats.find('.failures .value').text(this.failures);
    this.setMood('sad');

    test.err = err;
    if (test.type === 'hook') {
      // This is a bizarre misfeature in mocha, but apparently without
      // the reporter feeding this back, you will never hear these
      // hook failures. Things like the testem mocha adapter assume
      // this behavior.
      this.runner.emit('test end', test);
    }
  }

  onBlanketDone() {
    const $blanket = $('#blanket-main');
    const $title = $blanket.find('.bl-title > .bl-file');

    $title.text('Code Coverage');

    this.updateHidePassed();
  }

}

function grepUrl(pattern) {
  let { location } = window;
  let { search } = location;
  if (search) {
    search = search.replace(/[?&]grep=[^&\s]*/g, '').replace(/^&/, '?');
  }

  let prefix = search ? `${search}&` : '?';
  let { pathname: locationPath } = location;
  let encodedPattern = encodeURIComponent(pattern);

  return `${locationPath}${prefix}grep=${encodedPattern}`;
}

function fragmentForTest(test) {
  const $fragment = $('<li class="test"><h2><span class="title"></h2></li>');

  $fragment.find('h2 .title').text(test.title);
  $fragment.addClass(speedOfTest(test));

  if (test.state === 'passed') {
    $fragment.addClass('pass');

    $fragment.find('h2').append('<span class="duration"></span>');
    $fragment.find('.duration').text(`${test.duration}ms`);
  } else if (test.pending) {
    $fragment.addClass('pass')
    .addClass('pending');
  } else {
    $fragment.addClass('fail');

    $fragment.append('<pre class="error"></pre>');
    $fragment.find('.error').text(errorSummaryForTest(test))
    .append('<div class="dump">Dump stack to console</div>');
    $fragment.find('.dump').on('click', () => console.log(test.err.stack));
  }

  if (!test.pending) {
    const h2 = $fragment.find('h2');
    h2.append('<a class="replay" title="Replay">‣</a>');
    h2.find('.replay').attr('href', grepUrl(test.fullTitle()));

    const code = $('<pre><code></code></pre>');
    if (test.state === 'passed') {
      code.css('display', 'none');
    }
    code.find('code').text(cleanCode(test.fn.toString()));
    $fragment.append(code);
    h2.on('click', () => code.toggle());
  }

  return $fragment;
}

function speedOfTest(test) {
  const slow = test.slow();
  const medium = slow / 2;

  if (test.duration > slow) {
    return 'slow';
  } else if (test.duration > medium) {
    return 'medium';
  }

  return 'fast';
}

function errorSummaryForTest(test) {
  let summary = test.err.stack || test.err.toString();

  if (summary.indexOf(test.err.message) === -1) {
    summary = `${test.err.message}\n${summary}`;
  }

  if (summary === '[object Error]') {
    summary = test.err.message;
  }

  if (!test.err.stack && test.err.sourceURL && test.err.line !== undefined) {
    summary += `\n(${test.err.sourceURL}:${test.err.line})`;
  }

  return summary;
}

function cleanCode(code) {
  code = code.replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '')
  .replace(/^function *\(.*\) *{|\(.*\) *=> *{?/, '')
  .replace(/\s+\}$/, '');

  const spaces = code.match(/^\n?( *)/)[1].length;
  const tabs = code.match(/^\n?(\t*)/)[1].length;
  const count = tabs ? tabs : spaces;
  const ws = tabs ? '\t' : ' ';

  const re = new RegExp(`^\n?${ws}{${count}}`, 'gm');

  code = code.replace(re, '');

  return code.trim();

}

// Original from <https://gist.github.com/timrwood/7754098>
function setFavicon(mood) {
  const pngPrefix = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/';
  const redGraphic = `${pngPrefix}9hAAAAH0lEQVQ4T2P8z8AAROQDxlEDGEbDgGE0DIBZaBikAwCl1B/x0/RuTAAAAABJRU5ErkJggg==`;
  const greenGraphic = `${pngPrefix}9hAAAAHklEQVQ4T2Nk+A+EFADGUQMYRsOAYTQMgHloGKQDAJXkH/HZpKBrAAAAAElFTkSuQmCC`;

  let uri = (mood === 'happy') ? greenGraphic : redGraphic;
  const links = $('link');

  // Remove existing favicons
  links.each((idx, link) => {
    if (/\bicon\b/i.test(link.getAttribute('rel'))) {
      link.parentNode.removeChild(link);
    }
  });

  // Add new favicon
  const $link = $('<link type="image/x-icon" rel="icon">');
  $link.attr('href', uri);
  $('head').append($link);
}

function groupJSHint() {
  const $jshint = $('<li class="suite"><h1><a></a></h1><ul></ul></li>');
  $jshint.find('a').text('JSHint').attr('href', grepUrl('JSHint'));

  let $suites = $('.suite:contains("JSHint")');

  $suites.each((idx, suite) => {
    let $suite = $(suite);
    let suiteTitle = $suite.find('h1').text();
    let [ , fileName] = suiteTitle.match(/^JSHint - (.*)$/);
    let $test = $suite.find('.test');

    $test.find('.title').text(fileName);

    $jshint.find('ul').append($test);
    $suite.remove();
  });

  if ($jshint.find('.test.fail').length > 0) {
    $jshint.addClass('fail');
  } else {
    $jshint.addClass('pass');
  }

  $('#mocha-report').append($jshint);
}
