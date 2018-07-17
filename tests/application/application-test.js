import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupApplicationTest } from 'ember-mocha';
import { visit, click } from '@ember/test-helpers';

describe('Acceptance | application', function(hooks) {
  setupApplicationTest(hooks);

  it('click on component on components page', async function() {
    await visit('/');
    await click('.components-link');
    await click('button');

    expect(this.element.querySelector('.text').textContent).to.equal('Button Clicks: 1');
  });
});
