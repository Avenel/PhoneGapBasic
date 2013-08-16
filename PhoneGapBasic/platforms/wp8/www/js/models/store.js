// Tell Ember to handle models
App.Store = DS.Store.extend({
 adapter: 'DS.FixtureAdapter'
});