import {isEnterKey} from './../helpers/utils';
import TodoFilter from './../filters/todo';

export default Backbone.View.extend({
  tagName: 'li',
  template: _.template( $('#item-template').html() ),
  events: {
    'click .toggle': 'togglecompleted',
    'dblclick label': 'edit',
    'click .destroy': 'clear',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },
  // представление TodoView прослушивает изменения своей модели
  // и выполняет повторное отображение. Поскольку в этом приложении
  // **Todo** и **TodoView** соотносятся как 1 к 1,
  // для удобства мы устанавливаем прямую ссылку на модель.
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },
  // Повторно отображает заголовки задачи.
  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    this.$el.toggleClass( 'completed', this.model.get('completed') );
    this.toggleVisible();
    this.$input = this.$('.edit');
    return this;
  },

  toggleVisible : function () {
    this.$el.toggleClass( 'hidden', this.isHidden());
  },
  isHidden : function () {
    console.log('Is hidden: ' + TodoFilter.get());
    var isCompleted = this.model.get('completed');
    return (!isCompleted && TodoFilter.get() === 'completed') || 
      (isCompleted && TodoFilter.get() === 'active');
  },
  togglecompleted: function() {
    this.model.toggle();
  },

  // Переключение этого представления в режим редактирования,
  // отображение поля ввода.
  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },
  // Закрытие режима редактирования, сохранение изменений в задаче.
  close: function() {
    var value = this.$input.val().trim();
    if ( value ) {
      this.model.save({ title: value });
    } else {
      this.clear();
    }
    this.$el.removeClass('editing');
  },
  // Если вы нажмете `enter`, то редактирование элемента завершится.
  updateOnEnter: function( e ) {
    if ( isEnterKey(e.which) ) {
      this.close();
    }
  },
  clear: function() {
    this.model.destroy();
  }
});