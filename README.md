# ember-cli-mocha

**NOTE: This addon has been deprecated! Please use ember-mocha directly instead.**

## Migrating to `ember-mocha`

To upgrade from `ember-cli-mocha` to `ember-mocha` perform the following:

### `yarn`

* `yarn remove ember-cli-mocha`
* `yarn add -D ember-mocha`
* Update `tests/test-helper.js` to replace any imports from `ember-cli-mocha` with an import from `ember-mocha`.

### `npm`

* `npm uninstall --save-dev ember-cli-mocha`
* `npm install --save-dev ember-mocha`
* Update `tests/test-helper.js` to replace any imports from `ember-cli-mocha` with an import from `ember-mocha`.
