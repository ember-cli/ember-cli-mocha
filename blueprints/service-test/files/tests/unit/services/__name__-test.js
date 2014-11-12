import {
  describeModule,
  it
} from 'ember-mocha';

var expect = chai.expect;

describeModule(
  'service:<%= dasherizedModuleName %>',
  '<%= classifiedModuleName %>Service',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var service = this.subject();
      expect(service).to.be.ok;
    });
  }
);
