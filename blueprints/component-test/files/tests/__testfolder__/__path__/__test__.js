/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
<%= additionalImports %>

describeComponent(
  '<%= dasherizedModuleName %>',
  '<%= testPrefix %><%= classifiedModuleName %>Component',
  {
    <%= testOpts %>
  },
  function() {
    it('renders', function() {
      <%= defaultTest %>
    });
  }
);
