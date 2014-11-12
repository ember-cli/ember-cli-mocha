import {
  describeModule,
  it
} from 'ember-mocha';

var expect = chai.expect;

describeModule(
  'serializer:<%= dasherizedModuleName %>',
  '<%= classifiedModuleName %>Serializer',
  {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  },
  function() {
    // Replace this with your real tests.
    it('exists', function() {
      var serializer = this.subject();
      expect(serializer).to.be.ok;
    });
  }
);
