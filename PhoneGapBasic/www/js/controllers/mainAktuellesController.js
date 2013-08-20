App.MainAktuellesController = Ember.Controller.extend({
  
  init: function() {
    this.set('allNewsItems', App.News.find());
  },
  newsItemCount : 8,
  maxNewsItemCount: 15  
});