import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Component | Click Counter', function () {
  setupTest();

  it('should output correct text for numClicks', function() {
    let myComponent = this.owner.factoryFor('component:click-counter');
    let comp = myComponent.create({
      numClicks: 3
    });
    expect(comp.get('textToShow')).to.equal('Button Clicks: 3');
  });

});
