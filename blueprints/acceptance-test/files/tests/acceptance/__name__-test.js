/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

describe('Acceptance: <%= classifiedModuleName %>', function() {
  beforeEach(function() {
    App = startApp();
  });

  afterEach(function() {
    Ember.run(App, 'destroy');
  });

  it('can visit /<%= dasherizedModuleName %>', function() {
    visit('/<%= dasherizedModuleName %>');

    andThen(function() {
      expect(currentPath()).to.equal('<%= dasherizedModuleName %>');
    });
  });
});
