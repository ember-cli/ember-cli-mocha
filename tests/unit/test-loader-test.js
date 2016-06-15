import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';

describe('Unit | test-loader', function() {
  var TestLoader = window.require('ember-cli/test-loader')['default'];
  var originalRequire = window.require;
  var requiredModules;

  beforeEach(function() {
    requiredModules = [];

    window.require = (name) => {
      requiredModules.push(name);
    };
    window.require.unsee = () => {};

    window.requirejs.entries = {
      'valid-test': true,
      'valid_test': true,
      'valid.jshint': true,
      'not-valid-jshint': true,
      'not-a-test-module': true,
      'nohyphentest': true
    };
  });

  afterEach(function() {
    window.require = originalRequire;
  });

  it('loads properly suffixed modules', function() {
    TestLoader.load();

    var expectedModules = [
      'valid-test',
      'valid_test',
      'valid.jshint'
    ];

    expect(requiredModules).to.deep.equal(expectedModules);
  });
});
