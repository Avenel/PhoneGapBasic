/**
  Represents the main application
**/

App = Ember.Application.create();

App.Router.map(function() {
  this.route('main' , { path: "/" });
  this.route('student' , { path: "/student" });
  this.route('aktuelles', { path: "/aktuelles" });
  this.route('vorlesung', { path: "/vorlesung" });
});

App.AkutllesRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('aktuelles', {   // the template to render
      into: '_contentTemplate',                // the template to render into
      outlet: 'content',              // the name of the outlet in that template
      controller: 'AktuellesController'        // the controller to use for the template
    });
  }
});

// Generate Views
App.MyView = Mov.ContentView.extend({
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
      v.append(); 
    }
});