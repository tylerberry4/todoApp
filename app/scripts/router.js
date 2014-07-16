var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'showTodos'	
	},
	showTodos: function() {
		var App = new AppView();
	}
})

//Start your Router
new AppRouter();
Backbone.history.start();