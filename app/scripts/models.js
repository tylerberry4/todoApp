Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  toggle: function(){
 		this.save({ completed: !this.get('completed')});
        }
});

TodoList = Backbone.Collection.extend({
	model: Todo,
	localStorage: new Store("backbone-todo")
});

// instance of the Collection
var todoList = new TodoList();

