'use strict';

/* eslint-env node */

var path = require('path');

module.exports = {
  name: 'ember-cli-mocha',

  contentFor(type) {
    let output = this.eachAddonInvoke('contentFor', [type]);
    return output.join('\n');
  },

  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },
};
