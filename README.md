# ember-cli-mocha

Mocha / Chai testing for your Ember CLI apps.

## Installation

Remove QUnit from your ember-cli app:

```sh
npm rm ember-cli-qunit --save-dev
bower uninstall --save ember-qunit
bower uninstall --save qunit
bower uninstall --save ember-qunit-notifications
```

Install ember-cli-mocha:

```sh
npm install ember-cli-mocha --save-dev
ember generate ember-cli-mocha
```

## Usage

ember-cli-mocha overrides all of ember-cli's testing blueprints. Simply generate
models, controllers, components, etc. in order to generate the corresponding Mocha
/ Chai tests.

Tests rely on [ember-mocha](https://github.com/switchfly/ember-mocha) modules
and helpers. Please refer to that project to understand detailed usage.

## Copyright and License

Copyright 2014 Switchfly

This product includes software developed at
Switchfly (http://www.switchfly.com).

NOTICE: Only our own original work is licensed under the terms of the Apache
License Version 2.0. The licenses of some libraries might impose different
redistribution or general licensing terms than those stated in the Apache
License. Users and redistributors are hereby requested to verify these
conditions and agree upon them.
