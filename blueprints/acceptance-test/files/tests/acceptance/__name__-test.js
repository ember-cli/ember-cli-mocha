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

describe('Acceptance: <%= classifiedModuleName %>', function() {
  var application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    application.destroy();
  });

  beforeEach(function() {
    visit('/<%= dasherizedModuleName %>');
  });

  it('can visit /<%= dasherizedModuleName %>', function() {
    expect(currentPath()).to.equal('<%= dasherizedModuleName %>');
  });
});
