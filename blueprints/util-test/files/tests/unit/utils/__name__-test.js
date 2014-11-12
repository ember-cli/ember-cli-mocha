import <%= camelizedModuleName %> from '<%= dasherizedPackageName %>/utils/<%= dasherizedModuleName %>';

var expect = chai.expect;

describe('<%= camelizedModuleName %>', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = <%= camelizedModuleName %>();
    expect(result).to.be.ok;
  });
});
