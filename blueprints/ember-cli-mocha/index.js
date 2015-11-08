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

    return this.addBowerPackagesToProject([
      { name: 'ember-mocha',           source: 'ember-mocha',                     target: '~0.8.6' },
      { name: 'ember-cli-test-loader', source: 'ember-cli/ember-cli-test-loader', target: '0.1.3'  },
      { name: 'ember-cli-shims',       source: 'ember-cli/ember-cli-shims',       target: '0.0.3'  }
    ]).then(function() {
      if ('removePackageFromProject' in addonContext) {
        return addonContext.removePackageFromProject('ember-cli-qunit');
      }
    });
  }
};
