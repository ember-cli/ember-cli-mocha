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

    return this.addBowerPackageToProject('mocha', '~1.17.0')
      .then(function() {
        return addonContext.addBowerPackageToProject('chai', '~1.9.1');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('ember-mocha-adapter', '0.2.1');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('ember-mocha', '~0.1.0');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('dgeb/ember-cli-test-loader', 'test-agnostic');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('stefanpenner/ember-cli-shims', '0.0.3');
      });
  }
};
