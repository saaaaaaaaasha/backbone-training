export default Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  // переключение состояния задачи `completed`.
  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});