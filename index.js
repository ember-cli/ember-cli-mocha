/*jshint node:true*/

'use strict';

var path = require('path');
var fs = require('fs');
var jshintTrees = require('broccoli-jshint');

module.exports = {
  name: 'Ember CLI Mocha',

  overrideTestCommandFilter: function() {
    var TestCommand = this.project.require('ember-cli/lib/commands/test');

    TestCommand.prototype.buildTestPageQueryString = function(options) {
      var params = [];

      if (options.filter) {
        params.push('grep=' + options.filter);

        if (options.invert) {
           params.push('invert=1');
        }
      }

      if (options.query) {
        params.push(options.query);
      }

      return params.join('&');
    };

    TestCommand.prototype.availableOptions.push({
      name: 'invert',
      type: Boolean,
      default: false,
      description: 'Invert the filter specified by the --filter argument',
      aliases: ['i']
    });
  },

  init: function() {
    this.overrideTestCommandFilter();
  },

  postBuild: function () {
    this.checkPackages();
  },

  checkPackages: function () {
    var packages = Object.keys(this.project.addonPackages);
    if (packages.indexOf('ember-cli-qunit') !== -1) {
      console.warn('\nIt looks like you are using "ember-cli-qunit" which can cause issues with "ember-cli-mocha", please remove this package.\n');
      process.exit(1);
    }
    if (packages.indexOf('ember-cli-htmlbars-inline-precompile') < 0) {
      console.warn('\nIt looks like you\'re not on ember-cli 1.13, which includes ember-cli-htmlbars-inline-precompile by default. Please run: ember install ember-cli-htmlbars-inline-precompile.\n');
      process.exit(1);
    }
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function included(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included.call(this, target);

    this.options = target.options;

    if (app.tests) {
      var fileAssets = [
        app.bowerDirectory + '/mocha/mocha.js',
        app.bowerDirectory + '/mocha/mocha.css',
        app.bowerDirectory + '/chai/chai.js',
        app.bowerDirectory + '/ember-mocha/mocha-setup.js',
        app.bowerDirectory + '/ember-mocha-adapter/adapter.js',
        'vendor/ember-cli-mocha/test-loader.js'
      ];

      var addonOptions = app.options['ember-cli-mocha'] || {};
      if (addonOptions && !addonOptions.disableContainerStyles) {
        fileAssets.push('vendor/ember-cli-mocha/test-container-styles.css');
      }

      app.import(app.bowerDirectory + '/ember-mocha/ember-mocha.amd.js', {
         type: 'test',
         exports: {
           'ember-mocha': [
             'describeModule',
             'describeComponent',
             'describeModel',
             'it',
             'setResolver'
           ]
         }
      });

      app.import(app.bowerDirectory + '/ember-cli-shims/test-shims.js', {
        type: 'test',
        exports: {
          'qunit': ['default']
        }
      });

      fileAssets.forEach(function(file){
        app.import(file, {
          type: 'test'
        });
      });
    }
    this.jshintrc = app.options.jshintrc;
  },

  contentFor: function(type) {
    if (type === 'test-body') {
      return this._readTemplate('test-body');
    }
  },

  _readTemplate: function(name) {
    return fs.readFileSync(path.join(__dirname, 'templates', name + '.html'));
  },

  lintTree: function(type, tree) {
    // Skip if useLintTree === false.
    if (this.options && this.options['ember-cli-mocha'] && this.options['ember-cli-mocha'].useLintTree === false) {
      // Fakes an empty broccoli tree
      return { inputTree: tree, rebuild: function() { return []; } };
    }

    return jshintTrees(tree, {
      jshintrcPath: this.jshintrc[type],
      description: 'JSHint ' + type + '- Mocha',
      testGenerator: testGenerator
    });
  }

};

function testGenerator(relativePath, passed, errors) {
  if (errors) {
    errors = "\\n" + this.escapeErrorString(errors);
  } else {
    errors = "";
  }

  return "describe('JSHint - " + relativePath + "', function(){\n" +
    "it('should pass jshint', function() { \n" +
    "  expect(" + !!passed + ", '" + relativePath + " should pass jshint." + errors + "').to.be.ok; \n" +
    "})});\n";
}
