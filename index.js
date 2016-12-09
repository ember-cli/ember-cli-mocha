/*jshint node:true*/

'use strict';

var path = require('path');
var fs = require('fs');
var MergeTrees = require('broccoli-merge-trees');
var BabelTranspiler = require('broccoli-babel-transpiler');
var Concat = require('broccoli-concat');
var Funnel = require('broccoli-funnel');
var resolve = require('resolve');
var VersionChecker = require('ember-cli-version-checker');

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

  _getDependencyTrees: function() {
    if (this._dependencyTrees) {
      return this._dependencyTrees;
    }

    var emberTestHelpersPath = path.dirname(resolve.sync('ember-test-helpers', { basedir: this._emberMochaLibPath }));
    this._dependencyTrees = [
      this.treeGenerator(this._emberMochaLibPath),
      this.treeGenerator(emberTestHelpersPath),
    ];

    return this._dependencyTrees;
  },

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    this.overrideTestCommandFilter();

    var checker = new VersionChecker(this);
    var dep = checker.for('ember-cli', 'npm');

    this._shouldImportEmberMocha = !dep.gt('2.2.0-alpha');
    this._emberMochaLibPath = path.dirname(resolve.sync('ember-mocha'));

    this.setTestGenerator();
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

  treeForVendor: function(tree) {
    var mochaPath = path.dirname(resolve.sync('mocha'));
    // var mochaTree = this.treeGenerator(mochaPath);
    var mochaTree = new Funnel(mochaPath, {
      files: ['mocha.js', 'mocha.css'],
      destDir: '/mocha',
    });

    var emberMochaBuildSupportPath = path.join(this._emberMochaLibPath, '..', 'build-support');

    var mochaSetupTree = new Funnel(emberMochaBuildSupportPath, {
      files: ['mocha-setup.js', 'ember-mocha-adapter.js'],
      destDir: '/ember-mocha'
    });

    var trees = [
      tree,
      mochaTree,
      mochaSetupTree
    ];

    if (this._shouldImportEmberMocha) {
      // support for Ember CLI < 2.2.0-beta.1
      var depTree = new MergeTrees(this._getDependencyTrees());

      var transpiled = new BabelTranspiler(depTree, {
        loose: true,
        moduleIds: true,
        modules: 'amdStrict'
      });

      var concattedTree = new Concat(transpiled, {
        inputFiles: ['**/*.js'],
        outputFile: '/ember-mocha/ember-mocha.js',
        annotation: 'Concat: Ember Mocha'
      });


      trees.push(concattedTree);
    }

    return new MergeTrees(trees, {
      annotation: 'ember-cli-mocha: treeForVendor'
    });
  },

  treeForAddonTestSupport: function() {
    // for Ember CLI >= 2.2.0-beta.1
    return new MergeTrees(this._getDependencyTrees());
  },

  included: function included(app, parentAddon) {
    var target = (parentAddon || app);
    this._super.included.call(this, target);

    this.options = target.options || {};

    if (app.tests) {
      var fileAssets = [
        'vendor/mocha/mocha.js',
        'vendor/mocha/mocha.css',
        'vendor/ember-mocha/mocha-setup.js',
        'vendor/ember-mocha/ember-mocha-adapter.js',
        'vendor/ember-cli-mocha/test-loader.js'
      ];

      if (this._shouldImportEmberMocha) {
        // support for Ember CLI < 2.2.0-beta.1
        fileAssets.push('vendor/ember-mocha/ember-mocha.js');
      }

      var addonOptions = app.options['ember-cli-mocha'] || {};
      if (addonOptions && !addonOptions.disableContainerStyles) {
        fileAssets.push('vendor/ember-cli-mocha/test-container-styles.css');
      }

      fileAssets.forEach(function(file){
        app.import(file, {
          type: 'test'
        });
      });
    }
  },

  contentFor: function(type) {
    if (type === 'test-body') {
      return this._readTemplate('test-body');
    }
  },

  _readTemplate: function(name) {
    return fs.readFileSync(path.join(__dirname, 'templates', name + '.html'));
  },

  setTestGenerator: function() {
    this.project.generateTestFile = function(moduleName, tests) {
      var output = "describe('" + moduleName + "', function() {\n";

      tests.forEach(function(test) {
        output += "  it('" + test.name + "', function() {\n";
        if (test.passed) {
          output +=
            "    // precompiled test passed\n";
        } else {
          output +=
            "    // precompiled test failed\n" +
            "    var error = new chai.AssertionError('" + test.errorMessage + "');\n" +
            "    error.stack = undefined;\n" +
            "    throw error;\n";
        }
        output +=   "  });\n";
      });

      output += "});\n";

      return output;
    };
  }
};
