<% if (jshintExists) { %>/* jshint expr:true */
<% } %>import { expect } from 'chai';
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import Ember from 'ember';
<% if (destroyAppExists) { %>import destroyApp from '../helpers/destroy-app';<% } %>
import { initialize } from '<%= dasherizedPackageName %>/instance-initializers/<%= dasherizedModuleName %>';

describe('<%= classifiedModuleName %>InstanceInitializer', function() {
  let application;
  let appInstance;

  beforeEach(function() {
    Ember.run(function() {
      application = Ember.Application.create();
      appInstance = application.buildInstance();
    });
  });

  afterEach(function() {
    <% if (destroyAppExists) { %>destroyApp(application);<% } else { %>Ember.run(application, 'destroy');<% } %>
  });

  // Replace this with your real tests.
  it('works', function() {
    initialize(appInstance);

    // you would normally confirm the results of the initializer here
    expect(true).to.be.ok;
  });
});
