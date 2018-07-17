import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describe('Component | counter - Old Syntax', function() {
  setupComponentTest('click-counter', {
    needs: []
  });

  it('it should count clicks', async function() {
    await this.render(hbs`{{click-counter}}`);
    expect(Ember.$('.text').text()).to.equal('Button Clicks: 0');

    await Ember.$('button').click();
    expect(Ember.$('.text').text()).to.equal('Button Clicks: 1');
  });
});
