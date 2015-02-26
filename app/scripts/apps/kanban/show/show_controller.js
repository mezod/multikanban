define([
	'app',
	'apps/kanban/show/show_view'
], function(App, View){
	App.module("KanbanApp.Show", function(Show, App, Backbone, Marionette, $, _){
		var backlogTasks = null;
		var todoTasks = null;
		var doingTasks = null;
		var onholdTasks = null;
		var doneTasks = null;
		var archiveTasks = null;

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
					backlogTasks = App.request("backlog:task:entities", kanban_id);
					todoTasks = App.request("todo:task:entities", kanban_id);
					doingTasks = App.request("doing:task:entities", kanban_id);
					onholdTasks = App.request("onhold:task:entities", kanban_id);
					doneTasks = App.request("done:task:entities", kanban_id);
					archiveTasks = App.request("archive:task:entities", kanban_id);

					$.when(backlogTasks, todoTasks, doingTasks, onholdTasks, doneTasks, archiveTasks).done(function(){
						var backlog = new View.Column({
							collection: backlogTasks,
							columnName: "Backlog",
							columnId: "backlog",
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

				            backlog.on("childview:task:change", function(ChildView, model, index, from, to){
				            	console.log("backlog:change:task");
				            	Show.Controller.changeTask(ChildView, model, index, from, to);
				            });

						var todo = new View.Column({
							collection: todoTasks,
							columnName: "To do",
							columnId: "todo",
							sortType: "list"
						});

							todo.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

				            todo.on("childview:task:change", function(ChildView, model, index, from, to){
				            	console.log("todo:change:task");
				            	Show.Controller.changeTask(ChildView, model, index, from, to);
				            });

						var doing = new View.Column({
							collection: doingTasks,
							columnName: "Doing",
							columnId: "doing",
							sortType: "list"
						});

							doing.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

				            doing.on("childview:task:change", function(ChildView, model, index, from, to){
				            	console.log("doing:change:task");
				            	Show.Controller.changeTask(ChildView, model, index, from, to);
				            });

						var onhold = new View.Column({
							collection: onholdTasks,
							columnName: "On hold",
							columnId: "onhold",
							sortType: "list"
						});

							onhold.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

				            onhold.on("childview:task:change", function(ChildView, model, index, from, to){
				            	console.log("onhold:change:task");
				            	Show.Controller.changeTask(ChildView, model, index, from, to);
				            });

						var done = new View.Column({
							collection: doneTasks,
							columnName: "Done",
							columnId: "done",
							sortType: "date"
						});

							done.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

				            done.on("childview:task:change", function(ChildView, model, index, from, to){
				            	console.log("done:change:task");
				            	Show.Controller.changeTask(ChildView, model, index, from, to);
				            });

						var archive = new View.Column({
							collection: archiveTasks,
							columnName: "Archive",
							columnId: "archive",
							sortType: "date"
						});

							archive.on("childview:task:save", function(ChildView, model, text){
				            	Show.Controller.saveTask(ChildView, model, text);
				            });

				            archive.on("childview:task:change", function(ChildView, model, index, from, to){
				            	console.log("archive:change:task");
				            	Show.Controller.changeTask(ChildView, model, index, from, to);
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
            },

            changeTask: function(ChildView, model, index, from, to){
            	console.log("change:task");

            	// backend
            	var data = { 
            		'state' : to,
            		'position' : index
            	 };

            	oldIndex = model.attributes.position;

            	model.save(data);


            	//frontend
            	//model right state and index (by default when PUT)

            	//other tasks in to and from update index
            	switch(from){
            		case 'backlog':
            			backlogTasks.remove(model);
            			break;
            		case 'todo':
            			todoTasks.remove(model);
            			break;
            		case 'doing':
            			doingTasks.remove(model);
            			break;
            		case 'onhold':
            			onholdTasks.remove(model);
            			break;
            		case 'done':
            			doneTasks.remove(model);
            			break;
            		case 'archive':
            			archiveTasks.remove(model);
            			break;
            	}

            	
            	switch(to){
            		case 'backlog':	
            			this.updatePosition(backlogTasks, oldIndex, index);
				        backlogTasks.add(model);
            			break;
            		case 'todo':
            			this.updatePosition(todoTasks, oldIndex, index);
            			todoTasks.add(model);
            			break;
            		case 'doing':
            			this.updatePosition(doingTasks, oldIndex, index);
            			doingTasks.add(model);
            			break;
            		case 'onhold':
            			this.updatePosition(onholdTasks, oldIndex, index);
            			onholdTasks.add(model);
            			break;
            		case 'done':
            			this.updatePosition(doneTasks, oldIndex, index);
            			doneTasks.add(model);
            			break;
            		case 'archive':
            			this.updatePosition(archiveTasks, oldIndex, index);
            			archiveTasks.add(model);
            			break;
            	}

            	//update numElems
            	if(from != to){
            		var counter = $('#'+from).find('#counter').get([0]).textContent;
            		counter = parseInt(counter)-1;
            		$('#'+from).find('#counter').text(counter);
            	}
            },

            updatePosition: function(collection, oldIndex, newIndex){
            	collection.each(function (model, index) {
		            console.log("initfrom"); 
		            console.log(model.attributes.position); 
		            var position = index;
		            if (index >= newIndex) {
		                position += 1;
		            }
		            model.set('position', position);
		            console.log("endfrom"); 
		            console.log(model.attributes.position); 
		        });  
        	}
		}
	});

	return App.KanbanApp.Show.Controller;
});