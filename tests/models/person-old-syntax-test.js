import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupModelTest } from 'ember-mocha';

describe('Models | Person - Old Syntax', function() {
  setupModelTest('person', {
    needs: []
  });

  it('calculates full name correctly', function() {
    const store = this.store();

    store.push({
      data: {
        id: 1,
        type: 'person',
        attributes: {
          firstName: 'Tobias',
          lastName: 'Fünke'
        }
      }
    });

    let record = store.peekRecord('person', 1);
    expect(record.get('fullName')).to.equal('Tobias Fünke')
  });
});
