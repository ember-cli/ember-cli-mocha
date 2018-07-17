import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Models | Person', function(hooks) {
  setupTest(hooks);

  it('calculates full name correctly', function() {
    const store = this.owner.lookup('service:store');

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
