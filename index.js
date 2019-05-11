'use strict';

/* eslint-env node */

var path = require('path');

module.exports = {
  name: 'ember-cli-mocha',

  init() {
    this._super.init && this._super.init.apply(this, arguments);

    this.ui.writeDeprecateLine('ember-cli-mocha is deprecated, please migrate to depend on ember-mocha directly');
  },

  contentFor(type) {
    let output = this.eachAddonInvoke('contentFor', [type]);
    return output.join('\n');
  },

  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },
};
