window.App = Ember.Application.create();

App.Router.map(function() {
  this.resource('student', { path: '/' });
  this.resource('student', { path: '/student' });
  this.resource('aktuelles', { path: '/aktuelles' });
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
