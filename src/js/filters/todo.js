class TodoFilter {
  constructor() {
    this.filter = '';
  }
  set(filter) {
    this.filter = filter;
  }
  get() {
    return this.filter;
  }
}

var filter = new TodoFilter();
export default filter;