import { expect } from 'chai';
import { describe, it } from 'mocha';
import NameObject from 'dummy/utils/name';

describe('Unit::Utils::Name', function () {

  it('should output the default name Tobias Fünke', function() {
    let obj = NameObject.create();
    expect(obj.get('fullName')).to.equal('Tobias Fünke');
  });

  it('should allow the modification of the first or last names', function() {
    let obj = NameObject.create();
    expect(obj.get('fullName')).to.equal('Tobias Fünke');

    obj.set('firstName', 'Maeby');
    expect(obj.get('fullName')).to.equal('Maeby Fünke');

    obj.setProperties({
      firstName: 'Buster',
      lastName: 'Bluth'
    });
    expect(obj.get('fullName')).to.equal('Buster Bluth');
  });

});
