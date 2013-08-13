/**
  Represents the main application
**/

App = Ember.Application.create();

App.set('renderedTemplate', 'student');

App.Router.map(function() {
  this.resource('main', { path: '/' }, function() {
    this.route('student', { path: '/student' });
    this.route('aktuelles');
  });
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
    renderTemplate: function() {
      this.render('aktuelles', {
        outlet:'content'
      });
      App.set('renderedTemplate', 'aktuelles');
    }
});

// Generate Views
App.MyView = Mov.ContentView.extend({
  didInsertElement: function(){
    // This callback runs before lots_of_images has rendered.
    this.scheduleMasonry();
  },
  scheduleMasonry: (function(){
    Ember.run.scheduleOnce('afterRender', this, this.applyMasonry);
  }).observes('App.renderedTemplate'),
  applyMasonry: function(){
    $( document ).trigger( "create" );
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


// Init Page
$(document).bind('pageinit', function(){
    console.log('pageinit');
    var v = App.get('mainView');
  
    if (!v) {
      console.log('main not created');
      v = App.MainView.create();
      App.set('mainView',v);
      //v.append(); 
    }
});
