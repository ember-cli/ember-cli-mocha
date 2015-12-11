/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach
} from 'mocha';
import Ember from 'ember';
import { initialize } from '<%= dasherizedPackageName %>/initializers/<%= dasherizedModuleName %>';

describe('<%= classifiedModuleName %>Initializer', function() {
  let container, application;

  beforeEach(function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  it('works', function() {
    initialize(container, application);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
