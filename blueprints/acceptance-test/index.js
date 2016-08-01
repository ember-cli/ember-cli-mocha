var existsSync = require('exists-sync');
var path       = require('path');

module.exports = {
  description: 'Generates an acceptance test for a feature.',

  locals: function() {
    var destroyAppExists =
      existsSync(path.join(this.project.root, '/tests/helpers/destroy-app.js'));

    var packages = Object.keys(this.project.addonPackages);
    var jshintExists = packages.indexOf('ember-cli-jshint') !== -1;

    return {
      destroyAppExists: destroyAppExists,
      jshintExists: jshintExists
    };
  }
};
