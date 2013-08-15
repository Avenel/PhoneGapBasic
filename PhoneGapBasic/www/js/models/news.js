App.News = DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  organisation: DS.attr('string'),
  date: DS.attr('date')
});


App.News.FIXTURES = [
 {
   id: 1, 
   title: 'Neuer Koch', 
   content: 'inside content here',
   organisation: 'Mensa',
   date: '2013-08-15'
 }
];