import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  '<%= dasherizedModuleName %>',
  '<%= classifiedModuleName %>',
  {
    // Specify the other units that are required for this test.
    <%= typeof needs !== 'undefined' ? needs : '' %>
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var model = this.subject();
      // var store = this.store();
      expect(model).to.be.ok();
    });
  }
);
