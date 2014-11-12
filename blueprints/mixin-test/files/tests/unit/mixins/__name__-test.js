import Ember from 'ember';
import <%= classifiedModuleName %>Mixin from '<%= dasherizedPackageName %>/mixins/<%= dasherizedModuleName %>';

var expect = chai.expect;

describe('<%= classifiedModuleName %>Mixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    var <%= classifiedModuleName %>Object = Ember.Object.extend(<%= classifiedModuleName %>Mixin);
    var subject = <%= classifiedModuleName %>Object.create();
    expect(subject).to.be.ok;
  });
});
