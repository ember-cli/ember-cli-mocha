# ember-cli-mocha

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

Important: If you receive the conflict message "Unable to find suitable version
for ember-cli-test-loader" during the last step, choose the "test-agnostic"
branch. This dependency issue should be resolved soon.

## Copyright and License

Copyright 2014 Switchfly

This product includes software developed at
Switchfly (http://www.switchfly.com).

NOTICE: Only our own original work is licensed under the terms of the Apache
License Version 2.0. The licenses of some libraries might impose different
redistribution or general licensing terms than those stated in the Apache
License. Users and redistributors are hereby requested to verify these
conditions and agree upon them.
