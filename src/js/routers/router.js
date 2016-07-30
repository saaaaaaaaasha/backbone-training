import TodoFilter from './../filters/todo';
import Todos from './../collections/todos';

var Workspace = Backbone.Router.extend({
  routes:{
    '*filter': 'setFilter'
  },
  setFilter: function( param ) {

    console.log('Set filter: ' + param);
    TodoFilter.set(param || '');

    // задание текущего фильтра
    // генерация события filter коллекции, вызывающего
    // скрытие/отображение задач
    Todos.trigger('filter');
  }
});

var TodoRouter = new Workspace();
Backbone.history.start();

export default TodoRouter;
