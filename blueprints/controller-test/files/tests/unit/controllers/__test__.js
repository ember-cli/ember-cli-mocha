import {
  describeModule,
  it
} from 'ember-mocha';

var expect = chai.expect;

describeModule(
  'controller:<%= dasherizedModuleName %>',
  '<%= classifiedModuleName %>Controller',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var controller = this.subject();
      expect(controller).to.be.ok;
    });
  }
);
