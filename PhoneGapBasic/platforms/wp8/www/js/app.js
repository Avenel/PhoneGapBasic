/**
  Represents the main application
**/

App = Ember.Application.create();

App.set('renderedTemplate', 'student');

App.Router.map(function() {
  this.resource('main', { path: '/' }, function() {
    this.route('student');
    this.route('aktuelles');
    this.route('vorlesung');
  });
});

App.MainRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('main.aktuelles');
  }
});

App.MainStudentRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('student', {
      outlet:'content'
    });     
    App.set('renderedTemplate', 'student');
  }
});

App.MainAktuellesRoute = Ember.Route.extend({
  model: function(){
    return App.News.find({ beginId: 1, endId: $(window).height()/64 });
  },
  setupController: function(controller, model){
    controller.set('items', model);
  },
  renderTemplate: function() {
    this.render('aktuelles', {
      outlet:'content'
    });
    App.set('renderedTemplate', 'aktuelles');
  },
  events: {
    // infinite scroll
    more: function() {
      // if items to load exists, load them
      var length = this.controller.get('newsItemCount');
      var maxNewsItemCount = this.controller.get('allNewsItems').content.length;      
      
      if (length < maxNewsItemCount) { 
        var allItems = this.controller.get('allNewsItems');        
        var items = this.controller.get('items'),
            addItemCount = 2;

        // load new items
        var result = allItems.filter(function(item, index, enumerable) {
          if (item.id > length && item.id <= length + addItemCount) return true;
        });

        // add them to the existing items
        result = items.toArray().concat(result.toArray());
        
        // refresh itemCount and items
        this.controller.set('newsItemCount', length + addItemCount);
        this.controller.set('items', result);
      }
    }
  }
});

// Generate Views
App.MyView = Mov.ContentView.extend({
  layout: Ember.Handlebars.compile("<div id='contentWrapper'>{{yield}}</div>"),
  didInsertElement: function(){
    this.scheduleMasonry();
  },
  scheduleMasonry: (function(){
    Ember.run.scheduleOnce('afterRender', this, this.applyMasonry);
  }).observes('App.renderedTemplate'),
  applyMasonry: function(){
    // let jquery mobile render the new content
    $("#contentWrapper").trigger( "create" );
  },
  
  // infinite scroll
  didInsertElement: function() {
    var view = this;
    $(window).bind("scroll", function() {
      view.didScroll();
    });  
  },

  willDestroyElement: function() {
    $(window).unbind("scroll");
  },

  didScroll: function() {
    if(this.isScrolledToBottom()) {
      this.get('controller').send('more');
    }
  },

  isScrolledToBottom: function() {
    var distanceToTop = $(document).height() - $(window).height(),
        top           = $(document).scrollTop();

    return top === distanceToTop;
  }
});

App.HeaderView = Mov.HeaderView.extend({
});

App.FooterView = Mov.FooterView.extend({
});

App.ListView = Mov.ListView.extend({
});

App.MainView = Mov.PageView.extend({
    templateName:'main',
    id: 'main-view',
    didInsertElement: function() {
        $.mobile.changePage(this.$());
    }
});


// Customize Link, so one can define an icon
Ember.LinkView.reopen({
  attributeBindings: ["data-icon"]
});

// Init Page
$(document).bind('pageinit', function(){
    console.log('pageinit');
    var v = App.get('mainView');
  
    if (!v) {
      console.log('main not created');
      v = App.MainView.create();
      App.set('mainView',v);
    }
});

