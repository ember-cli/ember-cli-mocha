import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

describe('Unit | Component | Click Counter - Old Syntax', function () {
  setupComponentTest('click-counter', {
    needs: [],
    unit: true
  });

  it('should output correct text for numClicks', function() {
    let comp = this.subject({
      numClicks: 3
    });
    expect(comp.get('textToShow')).to.equal('Button Clicks: 3');
  });

});
