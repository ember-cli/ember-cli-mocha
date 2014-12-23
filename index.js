'use strict';

var path = require('path');
var fs = require('fs');

module.exports = {
  name: 'Ember CLI Mocha',

  overrideTestCommandFilter: function() {
    var TestCommand = this.project.require('ember-cli/lib/commands/test');

    TestCommand.prototype.buildTestPageQueryString = function(options) {
      var queryString = '';

      if (options.filter) {
        queryString = "?grep=" + options.filter;
      }

      return queryString;
    };
  },

  init: function() {
    this.overrideTestCommandFilter();
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);

    if (app.tests) {
      var fileAssets = [
        app.bowerDirectory + '/mocha/mocha.js',
        app.bowerDirectory + '/mocha/mocha.css',
        app.bowerDirectory + '/chai/chai.js',
        app.bowerDirectory + '/ember-mocha/mocha-setup.js',
        app.bowerDirectory + '/ember-mocha-adapter/adapter.js'
      ];

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
  },

  contentFor: function(type) {
    if (type === 'test-body') {
      return this._readTemplate('test-body');
    }
  },

  _readTemplate: function(name) {
    return fs.readFileSync(path.join(__dirname, 'templates', name + '.html'));
  }
};
