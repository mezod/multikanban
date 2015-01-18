define([
	'app',
	'apps/kanban/show/show_view'
], function(App, View){
	App.module("KanbanApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showTasks: function(){
				require(["entities/task"], function(){
					//layout
					var kanbanLayout = new View.Layout();

					//header
					var kanbanHeader = new View.KanbanHeader();

					//tasks
					var tasks = App.request("task:entities");

					var backlog = new View.Column({
						collection: tasks
					});

					var todo = new View.Column({
						collection: tasks
					});

					var doing = new View.Column({
						collection: tasks
					});

					var onhold = new View.Column({
						collection: tasks
					});

					var done = new View.Column({
						collection: tasks
					});

					var archive = new View.Column({
						collection: tasks
					});

					kanbanLayout.on("show", function(){
						kanbanLayout.kanbanHeader.show(kanbanHeader);
						kanbanLayout.backlog.show(backlog);
						kanbanLayout.todo.show(todo);
						kanbanLayout.doing.show(doing);
						kanbanLayout.onhold.show(onhold);
						kanbanLayout.done.show(done);
						kanbanLayout.archive.show(archive);
					});

					App.mainRegion.show(kanbanLayout);
					
				});
			}
		}
	});

	return App.KanbanApp.Show.Controller;
});