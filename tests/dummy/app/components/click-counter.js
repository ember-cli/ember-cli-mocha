import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  textToShow: computed('numClicks', function(){
    return `Button Clicks: ${this.get('numClicks')}`;
  }),
  numClicks: 0,
  actions: {
    btn(){
      this.set('numClicks', this.get('numClicks') + 1);
    }
  }
});
