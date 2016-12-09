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

    return addonContext.addPackageToProject('ember-cli-chai', '^0.3.0').then(function() {
      if ('removePackageFromProject' in addonContext) {
        return addonContext.removePackageFromProject('ember-cli-qunit');
      }
    });
  }
};
