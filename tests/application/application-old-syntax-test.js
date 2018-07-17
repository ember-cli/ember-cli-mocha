import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import startApp from 'dummy/tests/helpers/start-app';
import destroyApp from 'dummy/tests/helpers/destroy-app';
import Ember from 'ember';

describe('Acceptance | application - Old Syntax', function() {
  let application;

  beforeEach(function(){
    application = startApp();
  });

  afterEach(function(){
    destroyApp(application);
  });

  it('click on component on components page', async function() {
      await visit('/');
      await click('.components-link');
      await click('button');

      expect(Ember.$('.text').text()).to.equal('Button Clicks: 1');
  });
});
