define([
	'app',
	'apps/kanban/show/show_view'
], function(App, View){
	App.module("KanbanApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showTasks: function(kanban_id){
				require(["entities/task", "entities/kanban"], function(){
					//layout
					var kanbanLayout = new View.Layout();
					console.log("kanbanLayout " + kanbanLayout.cid);

					//kanban
					var kanban = App.request("kanban:entity", kanban_id);

					//header
					var kanbanHeader = new View.KanbanHeader({model: kanban});

					//tasks
					var backlogTasks = App.request("backlog:task:entities", kanban_id);
					var todoTasks = App.request("todo:task:entities", kanban_id);
					var doingTasks = App.request("doing:task:entities", kanban_id);
					var onholdTasks = App.request("onhold:task:entities", kanban_id);
					var doneTasks = App.request("done:task:entities", kanban_id);
					var archiveTasks = App.request("archive:task:entities", kanban_id);

					var backlog = new View.Column({
						collection: backlogTasks,
						columnName: "Backlog",
						sortType: "list"
					});

					var todo = new View.Column({
						collection: todoTasks,
						columnName: "To do",
						sortType: "list"
					});

					var doing = new View.Column({
						collection: doingTasks,
						columnName: "Doing",
						sortType: "list"
					});

					var onhold = new View.Column({
						collection: onholdTasks,
						columnName: "On hold",
						sortType: "list"
					});

					var done = new View.Column({
						collection: doneTasks,
						columnName: "Done",
						sortType: "date"
					});

					var archive = new View.Column({
						collection: archiveTasks,
						columnName: "Archive",
						sortType: "date"
					});

					kanbanLayout.on("show", function(){
						console.log("kanbanLayout " + kanbanLayout.cid);
						kanbanLayout.kanbanHeader.show(kanbanHeader);
						kanbanLayout.backlog.show(backlog);
						kanbanLayout.todo.show(todo);
						kanbanLayout.doing.show(doing);
						kanbanLayout.onhold.show(onhold);
						kanbanLayout.done.show(done);
						kanbanLayout.archive.show(archive);
					});

					App.on("fetched:kanban", function(){
						App.mainLayout.mainRegion.show(kanbanLayout);
					});

					
					
				});
			}
		}
	});

	return App.KanbanApp.Show.Controller;
});