import {
  describeComponent,
  it
} from 'ember-mocha';

var expect = chai.expect;

describeComponent(
  '<%= dasherizedModuleName %>',
  '<%= classifiedModuleName %>Component',
  {
    // specify the other units that are required for this test
    // needs: ['component:foo', 'helper:bar']
  },
  function() {
    it('renders', function() {
      // creates the component instance
      var component = this.subject();
      expect(component._state).to.equal('preRender');

      // appends the component to the page
      this.append();
      expect(component._state).to.equal('inDOM');
    });
  }
);
