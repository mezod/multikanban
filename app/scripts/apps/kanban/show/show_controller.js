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

					//kanban
					var kanban = App.request("kanban:entity", kanban_id);

					//header
					var kanbanHeader = new View.KanbanHeader({model: kanban});

						kanbanHeader.on("title:kanban:edit", function(model, title){
			            	var data = { 'title' : title };
			            	
			            	model.save(data);
		               		App.trigger("menu:show");
			            });

					//tasks
					var backlogTasks = App.request("backlog:task:entities", kanban_id);
					var todoTasks = App.request("todo:task:entities", kanban_id);
					var doingTasks = App.request("doing:task:entities", kanban_id);
					var onholdTasks = App.request("onhold:task:entities", kanban_id);
					var doneTasks = App.request("done:task:entities", kanban_id);
					var archiveTasks = App.request("archive:task:entities", kanban_id);

					$.when(backlogTasks, todoTasks, doingTasks, onholdTasks, doneTasks, archiveTasks).done(function(){
						var backlog = new View.Column({
							collection: backlogTasks,
							columnName: "Backlog",
							sortType: "list"
						});

							backlog.on("task:new", function(){
								console.log("task:new");
				                var newTask = App.request("task:entity:new", kanban_id);
				                
				                backlog.once("task:submit", function(text){
				                	console.log("task:submit");
				                	var data = { 'text' : text };

				               		newTask.save(data).then(function(){
				               			backlogTasks.each(function(elem){
				               				console.log(elem);
				               				console.log(elem.attributes.position);
				               				elem.attributes.position++;
				               			});
				               			backlogTasks.add(newTask);
				               		});
				                });
				            });

				            backlog.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

				            backlog.on("childview:task:delete", function(ChildView, args){
				            	Show.Controller.deleteTask(ChildView, args);
				            });

						var todo = new View.Column({
							collection: todoTasks,
							columnName: "To do",
							sortType: "list"
						});

							todo.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

						var doing = new View.Column({
							collection: doingTasks,
							columnName: "Doing",
							sortType: "list"
						});

							doing.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

						var onhold = new View.Column({
							collection: onholdTasks,
							columnName: "On hold",
							sortType: "list"
						});

							onhold.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

						var done = new View.Column({
							collection: doneTasks,
							columnName: "Done",
							sortType: "date"
						});

							done.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

						var archive = new View.Column({
							collection: archiveTasks,
							columnName: "Archive",
							sortType: "date"
						});

							archive.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
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

						App.once("fetched:kanban", function(){
							App.mainLayout.mainRegion.show(kanbanLayout);
						});
					});
					
				});
			},

			saveTask: function(ChildView, model, text){
            	console.log("task:save");
            	var data = { 'text' : text };
            	
            	model.save(data);
            },

            deleteTask: function(ChildView, args){
            	console.log("modal:task:delete");
            	var modal = new View.confirmDeleteView();
            	
				modal.render();
				 
				var $modalEl = $("#modal-region");

				$modalEl.html(modal.el);
				 
				require(["bootstrap"], function(){
					
					$modalEl.modal(); 
				});

				modal.on("confirm:delete", function(){
					args.model.destroy();
				});		            
            }
		}
	});

	return App.KanbanApp.Show.Controller;
});