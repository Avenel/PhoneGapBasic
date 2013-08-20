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
    // $(window).height()/64
    return App.News.find({ beginId: 1, endId: 5 });
  },
  setupController: function(controller, model){
    controller.set('items', model);
    controller.set('newsItemCount', 5);//$(window).height()/64);
  },
  renderTemplate: function() {
    this.render('aktuelles', {
      outlet:'content'
    });
    App.set('renderedTemplate', 'aktuelles');
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


App.LoadMoreView = Ember.View.extend({
  init: function() {
    $('#loaderActionView').bind('inview', function(isInView) {
      if (isInView) 
        Ember.tryInvoke(view.get('controller'), 'more');
    });
  },
  templateName: 'loadMore',
  didInsertElement: function() {
    var view = this;
    this.$().bind('inview', function(isInView) {
      if (isInView) 
        Ember.tryInvoke(view.get('controller'), 'more');
    });
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

