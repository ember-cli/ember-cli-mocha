import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default EmberObject.extend({
  firstName: 'Tobias',
  lastName: 'Fünke',
  fullName: computed('firstName', 'lastName', function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
})
