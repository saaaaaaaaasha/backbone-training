
//import my from './myModule';
//import $ from 'jquery';
//import Backbone from 'backbone';
//import _ from 'underscore';

// Backbone.LocalStorage = require("backbone.localstorage");

//my('very cooool!');

//$('div').hide();

let name = 'ES6'; 
console.log(`Hello, ${name}`);

/*
//import { add, substract } from './math';
//import * as myMath from './math';
import divide, {add, substract} from './math';
 */



var Todo = Backbone.Model.extend({
  initialize: function() {
    //console.log('This model has been initialized.');
    this.on('change:title', () => {
      //console.log('- Values for this model have changed.');
    });
  },
  defaults: {
   title: '',
   completed: false
  }
});

var todo1 = new Todo();

var todo2 = new Todo({
 title: 'Check the attributes of both model instances in the console.',
 completed: true
});

/*

console.log(JSON.stringify(todo1));
console.log(JSON.stringify(todo2)); 

console.log(todo2.get('title'));
console.log(todo2.toJSON());

*/

todo1.set({
 title: "Both attributes set through Model.set().",
 completed: true
});

todo1.set({
 completed: false
});

//console.log(JSON.stringify(todo1));


var person = new Backbone.Model({name: 'Jeremy'});

person.validate = (attrs) => {
  if (!attrs.name) {
    return 'I need your name';
  }
};

person.set({name: 'Samuel'});

//console.log(person.get('name'));
//console.log(person.unset('name', {validate: true}));
//console.log(person.get('name'));
//
//
var Todo = Backbone.Model.extend({
  defaults: {
    completed: false
  },
  validate: function(attribs){
    if(attribs.title === undefined){
      return "Remember to set a title for your todo.";
    }
  },
  initialize: function(){
    console.log('This model has been initialized.');
    this.on("invalid", function(model, error){
      console.log(error);
    });
  }
});

/*

var myTodo = new Todo();

myTodo.set('completed', true, {validate: true});
// В журнал: Remember to set a title for your todo.
console.log('completed: ' + myTodo.get('completed')); // completed: ложь

*/

var TodoView = Backbone.View.extend({
  tagName: 'li',
  // Кэширование функции шаблона для отдельного элемента.
  todoTpl: _.template( "An example template" ),
  events: {
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },
  // Повторное отображение заголовка задачи.
  render: function() {
    this.$el.html( this.todoTpl( this.model.toJSON() ) );
    this.input = this.$('.edit');
    return this;
  },
  edit: function() {
  // выполняется при двойном щелчке по задаче
  },
  close: function() {
  // выполняется, когда задача теряет фокус
  },
  updateOnEnter: function( e ) {
  // выполняется при каждом нажатии клавиши в режиме редактирования задачи,
  // но мы будем ждать нажатия enter, чтобы попасть в действие
  }
});

var todoView = new TodoView();
// помещаем в журнал ссылку на DOM-элемент,
// соответствующий экземпляру представления
console.log(todoView.el); // в журнале: <li></li> 


var TodosView = Backbone.View.extend({
  tagName: 'ul', // обязательное свойство, но устанавливается в 'div',
  // если не задано
  className: 'container', // необязательное свойство; можно присваивать ему
  // несколько классов, например 'container homepage'
  id: 'todos', // необязательное свойство
});
var todosView = new TodosView();
console.log(todosView.el); // в журнал: <ul id="todos" class="container"></ul>

//var todosView = new TodosView({el: $('#footer')});


// Мы также можем передать в setElement "сырую" разметку
// следующим образом (только для примера):
var view = new Backbone.View;
view.setElement('<p><a><b>test</b></a></p>');
console.log(view.$('a b').html()); // выводит "test"

var ItemView = Backbone.View.extend({
  events: {},
  render: function(){
    this.$el.html(this.model.toJSON());
    return this;
  }
});

var ListView = Backbone.View.extend({
  render: function(){
    // предполагаем, что наша модель публикует элементы,
    // которые мы собираемся вывести в списке
    var items = this.model.get('items');
    // Перебор всех элементов с помощью
    // итератора _.each библиотеки Underscore
    _.each(items, function(item){
      // Создание нового экземпляра ItemView, передача
      // ему конкретного элемента модели
      var itemView = new ItemView({ model: item });
      // DOM-элемент представления itemView добавляется после
      // его отображения. Конструкция
      // 'return this' удобна, когда представление itemView
      // отображает свою модель.
      // Затем мы запрашиваем вывод представления ("el")
      this.$el.append( itemView.render().el );
    }, this);
  }
});


// -------

var Todo = Backbone.Model.extend({ 
 defaults: {
 title: '',
 completed: false
 }
});
var TodosCollection = Backbone.Collection.extend({
 model: Todo
});
var myTodo = new Todo({title:'Read the whole book', id: 2});
// передача массива моделей при создании экземпляра коллекции
var todos = new TodosCollection([myTodo]);
//console.log("Collection size: " + todos.length); // Collection size: 1

var items = new Backbone.Collection;
items.add([{ id : 1, name: "Dog" , age: 3}, { id : 2, name: "cat" , age: 2}]);
items.add([{ id : 1, name: "Bear" }], {merge: true });
items.add([{ id : 2, name: "lion" }]); // merge: false
//console.log(JSON.stringify(items.toJSON()));
// [{"id":1,"name":"Bear","age":3},{"id":2,"name":"cat","age":2}]

var myTodo = new Todo({title:'Read the whole book', id: 2});
// передача массива моделей при создании экземпляра коллекции
var todos = new TodosCollection([myTodo]);
var todo2 = todos.get(2);
// Модели, как объекты, передаются по ссылке
//console.log(todo2 === myTodo); // true

//console.log('cid: ' + todo2.cid);


var Todos = new Backbone.Collection();
Todos.add([
 { title: 'go to Belgium.', completed: false },
 { title: 'go to China.', completed: false },
 { title: 'go to Austria.', completed: true }
]);
// перебор моделей коллекции
Todos.forEach(function(model){
 console.log(model.get('title'));
});

var sortedByAlphabet = Todos.sortBy(function (todo) {
 return todo.get("title").toLowerCase();
});

console.log("- Now sorted: ");
sortedByAlphabet.forEach(function(model){
 console.log(model.get('title'));
});

var View = Backbone.View.extend({
 el: '#todo',
 // привязка к DOM-событию с помощью свойства event
 events: {
 'click [type="checkbox"]': 'clicked',
 },
 initialize: function () {
 // привязка к DOM-событию с помощью jQuery
 this.$el.click(this.jqueryClicked);
 // Привязка к API-событию
 this.on('apiEvent', this.callback);
 },
 // 'this' указывает на представление
 clicked: function(event) {
 console.log("events handler for " + this.el.outerHTML);
 this.trigger('apiEvent', event.type);
 },
 // 'this' указывает на обрабатывающий DOM-элемент
 jqueryClicked: function(event) {
 console.log("jQuery handler for " + this.outerHTML);
 },
 callback: function(eventType) {
 console.log("event type was " + eventType);
 }
});
var view = new View();
/*
var TodoRouter = Backbone.Router.extend({
 routes: {
 "about" : "showAbout",
 "search/:query" : "searchTodos",
 "search/:query/p:page" : "searchTodos"
 },
 showAbout: function(){},
 searchTodos: function(query, page){
 var page_number = page || 1;
 console.log("Page number: " + page_number + " of the results for todos containing the word: " + query);
 }
});
var myTodoRouter = new TodoRouter();
Backbone.history.start();*/
// перейдите в консоль и проверьте:
// http://localhost/#search/job/p3, в журнале: Page number: 3 of the results for
// todos containing the word: job
// http://localhost/#search/job, в журнале: Page number: 1 of the results for
// todos containing the word: job
// и т. п.


// Представим, что мы хотим обновить определенный
// фрагмент URL (edit), когда пользователь открывает задачу
var TodoRouter = Backbone.Router.extend({
 routes: {
 "todo/:id": "viewTodo",
 "todo/:id/edit": "editTodo"
 // ... other routes
 },
 viewTodo: function(id){
 console.log("View todo requested.");
 this.navigate("todo/" + id + '/edit', {trigger: true});
 // обновляет фрагмент, но не генерирует маршрут
 },
 editTodo: function(id) {
 console.log("Edit todo opened.");
 }
});
var myTodoRouter = new TodoRouter();
Backbone.history.start();
// перейдите по адресу http://localhost/#todo/4
//