var existsSync = require('exists-sync');
var path       = require('path');

module.exports = {
  description: 'Generates an acceptance test for a feature.',

  locals: function() {
    var destroyAppExists =
      existsSync(path.join(this.project.root, '/tests/helpers/destroy-app.js'));

    return {
      destroyAppExists: destroyAppExists
    };
  }
};
