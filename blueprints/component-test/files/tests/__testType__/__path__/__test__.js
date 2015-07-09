/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';<%= testImports %>

describeComponent(
  '<%= dasherizedModuleName %>',
  '<%= testPrefix %><%= classifiedModuleName %>Component',
  {
    <%= testOpts %>
  },
  function() {
    it('renders', function() {
      <%= testContent %>
    });
  }
);
