import Todo from './../models/todo';

const collection = Backbone.Collection.extend({
  model: Todo,
  localStorage: new Backbone.LocalStorage('todos-backbone'),

  // Фильтрация завершенных задач списка.
  completed: function() {
    return this.filter(function( todo ) {
      return todo.get('completed');
    });
  },

  // Фильтрация незавершенных задач списка.
  remaining: function() {
    return this.without.apply( this, this.completed() );
  },

  nextOrder: function() {
    if ( !this.length ) {
      return 1;
    }
    return this.last().get('order') + 1;
  },

  comparator: function( todo ) {
    return todo.get('order');
  }
});

var Todos = new collection();
export default Todos; // (?)