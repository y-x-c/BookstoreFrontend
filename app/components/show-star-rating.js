import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  didInsertElement: function() {
    this._super.apply(this, arguments);
    Ember.run.schedule('afterRender', this, this.showRating);
  },

  showRating: function() {
    var rating = this.get('rating');
    var maxRating = this.get('maxRating') || 10;
    var num = this.get('num') || 5;
    var full = Math.floor(maxRating / num);

    var fullStar = '<i class="glyphicon glyphicon-star full-star"></i>';
    var halfStar = '<i class="glyphicon glyphicon-star half-star"></i>';
    var html = '';
    for(; rating >= full; rating -= full) {
      html += fullStar;
    }
    if(rating > 0) html += halfStar;

    this.$().html(html);
  },

  update: Ember.observer('rating', function() {
    Ember.run.once(this, this.showRating);
  })
});
