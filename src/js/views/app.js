import {isEnterKey} from './../helpers/utils';
import TodoFilter from './../filters/todo';
import TodoView from './todos';
import Todos from './../collections/todos';

export default Backbone.View.extend({
  el: '#todoapp',
  statsTemplate: _.template( $('#stats-template').html() ),
  events: {
    'keypress #new-todo': 'createOnEnter',
    'click #clear-completed': 'clearCompleted',
    'click #toggle-all': 'toggleAllComplete'
  },
  // при инициализации мы делаем привязку к соответствующим 
  // событиям коллекции `Todos` при добавлении и изменении событий.
  initialize: function() {
    this.allCheckbox = this.$('#toggle-all')[0];
    this.$input = this.$('#new-todo');
    this.$footer = this.$('#footer');
    this.$main = this.$('#main');
    this.listenTo(Todos, 'add', this.addOne);
    this.listenTo(Todos, 'reset', this.addAll);
    this.listenTo(Todos, 'change:completed', this.filterOne);
    this.listenTo(Todos,'filter', this.filterAll);
    this.listenTo(Todos, 'all', this.render);
    Todos.fetch();
  },
  render: function() {
    var completed = Todos.completed().length;
    var remaining = Todos.remaining().length;
    if ( Todos.length ) {
      this.$main.show();
      this.$footer.show();
      this.$footer.html(this.statsTemplate({
        completed: completed,
        remaining: remaining
      }));

      console.log('view render: ' + TodoFilter.get());

      this.$('#filters li a')
        .removeClass('selected')
        .filter('[href="#/' + ( TodoFilter.get() || '' ) + '"]')
        .addClass('selected');
    } else {
      this.$main.hide();
      this.$footer.hide();
    }
    this.allCheckbox.checked = !remaining;
  },

  // Добавление в список единственной задачи путем создания
  // представления для нее и добавления ее элемента в `<ul>`.
  addOne: function( todo ) {
    var view = new TodoView({ model: todo });
    $('#todo-list').append( view.render().el );
  },
  // Одновременное добавление всех элементов в коллекцию Todos.
  addAll: function() {
    this.$('#todo-list').html('');
    Todos.each(this.addOne, this);
  },

  filterOne : function (todo) {
    todo.trigger('visible');
  },
  filterAll : function () {
    Todos.each(this.filterOne, this);
  },

  newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: Todos.nextOrder(),
      completed: false
    };
  },

  // Создание новой задачи и ее сохранение в локальном хранилище
  createOnEnter: function( event ) {
    if ( !isEnterKey(event.which) || !this.$input.val().trim() ) {
      return;
    }
    Todos.create( this.newAttributes() );
    this.$input.val('');
  },

  // Удаление всех завершенных задач уничтожением их моделей.
  clearCompleted: function() {
    _.invoke(Todos.completed(), 'destroy');
    return false;
  },

  toggleAllComplete: function() {
    var completed = this.allCheckbox.checked;
    Todos.each(function( todo ) {
      todo.save({
        'completed': completed
      });
    });
  }
});