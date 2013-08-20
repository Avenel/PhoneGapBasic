// Tell Ember to handle models
App.Store = DS.Store.extend({
 adapter: DS.FixtureAdapter.extend({
        queryFixtures: function(fixtures, query, type) {
            return fixtures.filter(function(item) {
              // Between IDs
              if (item["id"] >= query["beginId"] &&
                  item["id"] <= query["endId"]) 
                return true;
              
              return false;
            });
          
        }
    })
});

