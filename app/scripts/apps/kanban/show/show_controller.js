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
						collection: tasks,
						columnName: "Backlog",
						sortType: "list"
					});

					var todo = new View.Column({
						collection: tasks,
						columnName: "To do",
						sortType: "list"
					});

					var doing = new View.Column({
						collection: tasks,
						columnName: "Doing",
						sortType: "list"
					});

					var onhold = new View.Column({
						collection: tasks,
						columnName: "On hold",
						sortType: "list"
					});

					var done = new View.Column({
						collection: tasks,
						columnName: "Done",
						sortType: "date"
					});

					var archive = new View.Column({
						collection: tasks,
						columnName: "Archive",
						sortType: "date"
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

					App.mainLayout.mainRegion.show(kanbanLayout);
					
				});
			}
		}
	});

	return App.KanbanApp.Show.Controller;
});