import EmberOject from '@ember/object';
import { computed } from '@ember/object';

export default EmberOject.extend({
  firstName: 'Tobias',
  lastName: 'Fünke',
  fullName: computed('firstName', 'lastName', function(){
    return `${this.get('firstName')} ${this.get('lastName')}`;
  })
})
