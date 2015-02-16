/* globals jQuery,chai,mocha */

jQuery(document).ready(function() {
  // Declare `expect` as a global here instead of as a var in individual tests.
  // This avoids jshint warnings re: `Redefinition of 'expect'`.
  window.expect = chai.expect;

  var TestLoader = require('ember-cli/test-loader')['default'];
  TestLoader.prototype.shouldLoadModule = function(moduleName) {
    return moduleName.match(/[-_]test$/) || moduleName.match(/\.jshint$/);
  };

  TestLoader.prototype.moduleLoadFailure = function(moduleName, error) {
    describe('TestLoader Failures', function () {
      it(moduleName + ': could not be loaded', function() {
        throw error;
      });
    });
  };

  // Attempt to mitigate sourcemap issues in Chrome
  // See: https://github.com/ember-cli/ember-cli/issues/3098
  //      https://github.com/ember-cli/ember-cli-qunit/pull/39
  setTimeout(function() {
    TestLoader.load();

    mocha.run();
  }, 250);
});
