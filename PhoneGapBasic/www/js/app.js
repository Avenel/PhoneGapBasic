/**
  Represents the main application
**/

App = Ember.Application.create();

App.Router.map(function() {
  this.route('main' , { path: "/" });
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