var EOL = require('os').EOL;

module.exports = {
  name: 'ember-cli-mocha',

  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var addonContext = this;

    this.insertIntoFile('tests/.jshintrc',
      '    "mocha",' + EOL +
      '    "chai",' + EOL +
      '    "expect",' + EOL +
      '    "describe",' + EOL +
      '    "it",' + EOL +
      '    "before",' + EOL +
      '    "beforeEach",' + EOL +
      '    "after",' + EOL +
      '    "afterEach",',
      {after:'  "predef": ['+EOL});

    return this.addBowerPackageToProject('ember-mocha', '~0.2.0')
      .then(function() {
        return addonContext.addBowerPackageToProject('ember-cli/ember-cli-test-loader', '0.1.0');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('stefanpenner/ember-cli-shims', '0.0.3');
      });
  }
};
