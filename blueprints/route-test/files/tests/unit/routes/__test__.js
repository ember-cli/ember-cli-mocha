import {
  describeModule,
  it
} from 'ember-mocha';

var expect = chai.expect;

describeModule(
  'route:<%= dasherizedModuleName %>',
  '<%= classifiedModuleName %>Route',
  {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  },
  function() {
    it('exists', function() {
      var route = this.subject();
      expect(route).to.be.ok;
    });
  }
);
