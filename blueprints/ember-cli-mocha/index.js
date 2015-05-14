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

    return this.addBowerPackageToProject('ember-mocha', '~0.7.0')
      .then(function() {
        return addonContext.addBowerPackageToProject('ember-cli/ember-cli-test-loader', '0.1.3');
      })
      .then(function() {
        return addonContext.addBowerPackageToProject('ember-cli/ember-cli-shims', '0.0.3');
      });
  }
};
