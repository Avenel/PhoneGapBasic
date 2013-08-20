App.MainAktuellesController = Ember.Controller.extend({
  
  init: function() {
    this.set('allNewsItems', App.News.find());
    this.set('canLoadMore', true);
  },
  
  newsItemCount: 5,
  
  // infinite scroll
  more: function() {
    // if items to load exists, load them
    var length = this.get('newsItemCount');
    var maxNewsItemCount = this.get('allNewsItems').content.length;
    var controller = this;
    
    // Very ugly, otherwise the loader element will be not updated -.-
    // workaround, i will find a better solution later on.
    setTimeout(function(){
      if (length < maxNewsItemCount) { 
        controller.set('isLoading', true);
        
        var allItems = controller.get('allNewsItems');        
        var items = controller.get('items'),
            addItemCount = 5;
  
        // load new items
        var result = allItems.filter(function(item, index, enumerable) {
          if (item.id > length && item.id <= length + addItemCount) return true;
        });
  
        // add them to the existing items
        result = items.toArray().concat(result.toArray());
        
        // refresh itemCount and items
        controller.set('newsItemCount', length + addItemCount);
        controller.set('items', result);
        controller.set('isLoading', false);
        $('#loaderText').html("");
        $('#loaderActionView').show();
      } 
      else {
        controller.set('isLoading', false);
        controller.set('canLoadMore', false);
        $('#loader').html("");
      }
    }, 100);
  }
});