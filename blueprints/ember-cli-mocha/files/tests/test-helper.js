/* globals require, mocha */
import resolver from './helpers/resolver';
import { setResolver } from 'ember-mocha';

setResolver(resolver);

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

$(document).ready(function(){
  // Rename elements from qunit -> mocha
  $('#qunit').attr('id', 'mocha');
  $('#qunit-fixture').attr('id', 'mocha-fixture');

  // Declare `expect` as a global here instead of as a var in individual tests.
  // This avoids jshint warnings re: `Redefinition of 'expect'`.
  window.expect = chai.expect;

  var TestLoader = require('ember-cli/test-loader')['default'];
  TestLoader.prototype.shouldLoadModule = function(moduleName) {
    return moduleName.match(/[-_]test$/) || moduleName.match(/\.jshint$/);
  };
  TestLoader.load();

  mocha.run();
});
