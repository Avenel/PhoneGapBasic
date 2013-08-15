App.AktuellesController = = Ember.ArrayProxy.create({
    content: App.sampleFixture,

    addMore: function() {
        var content = this.get('content');
        content.pushObject(Em.Object.create({
            title: 'New Item',
            description: 'Another Item',
            thumbnail: 'http://jquerymobile.com/demos/1.0/docs/lists/images/album-bb.jpg'
        }));
    }
});