// renders the full list of todo items calling TodoView for each one.
AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo');
    // when new elements are added to the collection render then with addOne
    todoList.on('add', this.addOne, this);
    todoList.on('reset', this.addAll, this);
    todoList.fetch(); // Loads list from local storage
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter'
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) { // ENTER_KEY = 13
      return;
    }
    todoList.create(this.newAttributes());
    this.input.val(''); // clean input box
  },
  addOne: function(todo){
    var view = new TodoView({model: todo});
    $('#todo-list').append(view.render().el);
  },
  addAll: function(){
    this.$('#todo-list').html(''); // clean the todo list
    todoList.each(this.addOne, this);
  },
  newAttributes: function(){
    return {
      title: this.input.val().trim(),
      completed: false
    }
  }
});

// renders individual todo items list (li)
TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$('.edit');
    return this; // enable chained calls
  },
  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },      
  events: {
    'dblclick label' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close',
 		'click .toggle': 'toggleCompleted',
 		'click .destroy' : 'destroy'
  },
  edit: function(){
    this.$el.addClass('editing');
    this.input.focus();
  },
  close: function(){
    var value = this.input.val().trim();
    if(value) {
      this.model.save({title: value});
    }
    this.$el.removeClass('editing');
  },
  updateOnEnter: function(e){
    if(e.which == 13){
      this.close();
      return this;
    }
  },
  toggleCompleted: function(){
  	this.model.toggle();
  },
  destroy: function(){
  	this.model.destroy();
  } 
});