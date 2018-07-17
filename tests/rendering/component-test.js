import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupRenderingTest } from 'ember-mocha';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

describe('Component | counter', function(hooks) {
  setupRenderingTest(hooks);

  it('it should count clicks', async function() {
    await render(hbs`{{click-counter}}`);
    expect(this.element.querySelector('.text').textContent).to.equal('Button Clicks: 0');

    await click('button');
    expect(this.element.querySelector('.text').textContent).to.equal('Button Clicks: 1');
  });
});
