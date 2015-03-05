define([
	'app',
	"tpl!apps/kanban/show/templates/kanban_layout.tpl",
	"tpl!apps/kanban/show/templates/kanban_header.tpl",
	"tpl!apps/kanban/show/templates/column.tpl",
	"tpl!apps/kanban/show/templates/task.tpl",
	"tpl!apps/kanban/show/templates/confirmDelete.tpl"
], function(App, layoutTpl, headerTpl, columnTpl, taskTpl, confirmDeleteTpl){
	App.module("KanbanApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Layout = Marionette.LayoutView.extend({
			template: layoutTpl,

			regions: {
				kanbanHeader: "#kanban-header",
				backlog: "#backlog-column",
				todo: "#todo-column",
				doing: "#doing-column",
				onhold: "#onhold-column",
				done: "#done-column",
				archive: "#archive-column"
			}
		});

		View.KanbanHeader = Marionette.ItemView.extend({
			template: headerTpl,

			events: {
				"click .editTitle": "editTitle",
				"click .saveTitle": "submitEditTitle",
				"click .cancelTitle": "cancelEditTitle"
			},

			editTitle: function(e){
				console.log("title:kanban:edit");
				e.preventDefault();
				e.stopPropagation();

				// make a tag editable
				var h1 = $('header h1');
				h1.attr("contentEditable", true);
				h1.focus();
				this.setEndOfContenteditable(h1[0]);


				$('.editTitle').hide();
				$('.saveTitle').show();
				$('.cancelTitle').show();
					
				// keypress event
				var that = this;
				h1.keypress(function(ev){
					if(ev.which == 13) {
						ev.preventDefault();
						that.submitEditTitle(e);
					}
				});
			},

			submitEditTitle: function(e){
				console.log("title:kanban:submit:edit");
				e.preventDefault();
				e.stopPropagation();

				var h1 = $('header h1');
				var title = h1.get([0]).firstChild.textContent;		

				console.log("TITLE -- " + title);
				console.log("this");
				console.log(this);		

		    	this.trigger("title:kanban:edit", this.model, title);

				this.showTitle();
			},

			cancelEditTitle: function(e){
				console.log("title:kanban:cancel:edit");
				e.preventDefault();
				e.stopPropagation();

				this.showTitle(e);
			},

			showTitle: function(){

				// make a tag not editable anymore
				var h1 = $('header h1');
				h1.removeAttr("contentEditable");

				// change styles
				$('.editTitle').show();
				$('.saveTitle').hide();
				$('.cancelTitle').hide();

				// re-render model original
				this.render();
			},

			// Focus at the end of the a tag text
			setEndOfContenteditable: function(contentEditableElement){
			    var range,selection;
			    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
			    {
			        range = document.createRange();//Create a range (a range is a like the selection but invisible)
			        range.selectNodeContents(contentEditableElement.firstChild);//Select the entire contents of the element with the range
			        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			        selection = window.getSelection();//get the selection object (allows you to change selection)
			        selection.removeAllRanges();//remove any selections already made
			        selection.addRange(range);//make the range you have just created the visible selection
			    }
			    else if(document.selection)//IE 8 and lower
			    { 
			        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
			        range.moveToElementText(contentEditableElement.firstChild);//Select the entire contents of the element with the range
			        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			        range.select();//Select the range (make it the visible selection
			    }
			}
		});

		View.Task = Marionette.ItemView.extend({
			template: taskTpl,
			tagName: "li",
			className: "task",

			triggers: {
				"click .deleteTask": "task:delete"
			},

			events: {
				"click .editTask": "editTask",
				"click .saveTask": "saveTask",
				"click .cancelTask": "cancelTask",
				"drop": "drop"
			},

			editTask: function(e){
				console.log("task:edit");
				e.preventDefault();
				e.stopPropagation();

				// make a tag editable
				var a = $(e.currentTarget.parentNode.parentNode.children[1].children);
				var task = $(e.currentTarget.parentNode.parentNode);
				a.attr("contentEditable", true);
				a.focus();
				this.setEndOfContenteditable(a[0]);

				
				// change styles
				task.addClass('editing');

				task.find('.editTask')
					.removeClass('glyphicon-pencil editTask')
					.addClass('glyphicon-floppy-disk saveTask');
				task.find('.deleteTask')
					.removeClass('deleteTask')
					.addClass('cancelTask');


				// keypress event
				var that = this;
				a.keypress(function(ev){
					if(ev.which == 13) {
						ev.preventDefault();
						that.saveTask(e);
					}
				});
			},

			saveTask: function(e){
				console.log("task:save");
				e.preventDefault();
				e.stopPropagation();

				var a = $(e.currentTarget.parentNode.parentNode.children[1].children);
				var text = a.get([0]).firstChild.textContent;		

		    	this.trigger("task:save", this.model, text);

				this.showTask(e);
			},

			cancelTask: function(e){
				console.log("task:cancel");
				e.preventDefault();
				e.stopPropagation();

				this.showTask(e);
			},

			showTask: function(e){

				// make a tag not editable anymore
				var a = $(e.currentTarget.parentNode.parentNode.children[1].children);
				var task = $(e.currentTarget.parentNode.parentNode);
				a.removeAttr("contentEditable");

				// change styles
				task.removeClass('editing');
				task.find('.saveTask')
					.removeClass('glyphicon-floppy-disk saveTask')
					.addClass('glyphicon-pencil editTask');
				task.find('.cancelTask')
					.removeClass('cancelTask')
					.addClass('deleteTask');

				// re-render model original
				this.render();
			},

			// Focus at the end of the a tag text
			setEndOfContenteditable: function(contentEditableElement){
			    var range,selection;
			    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
			    {
			        range = document.createRange();//Create a range (a range is a like the selection but invisible)
			        range.selectNodeContents(contentEditableElement.firstChild);//Select the entire contents of the element with the range
			        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			        selection = window.getSelection();//get the selection object (allows you to change selection)
			        selection.removeAllRanges();//remove any selections already made
			        selection.addRange(range);//make the range you have just created the visible selection
			    }
			    else if(document.selection)//IE 8 and lower
			    { 
			        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
			        range.moveToElementText(contentEditableElement.firstChild);//Select the entire contents of the element with the range
			        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
			        range.select();//Select the range (make it the visible selection
			    }
			},

			drop: function(event, index, sender, placeholder){
		    	console.log("drop");
		    	console.log(index);
		    	console.log(sender);
		    	console.log(placeholder);
		    	this.trigger('task:change', this.model, index, sender, placeholder);
		    }
		});

		View.Column = Marionette.CompositeView.extend({
			template: columnTpl,
			childView: View.Task,
			childViewContainer: 'ul',

			ui: {
				counter: "#counter",
			},

			events: {
				"click .newTask": "newTask",
				"click .submitTask": "submitTask",
				"click .customSort": "customSort",
				"click .dateCreatedSort": "dateCreatedSort",
				"click .dateCreatedSortInverse": "dateCreatedSortInverse",
				"click .dateCompletedSort": "dateCompletedSort",
				"click .dateCompletedSortInverse": "dateCompletedSortInverse"
			},

			initialize: function(options){
				//this.listenTo(this.collection, "sync", this.render);
				this.columnName = options.columnName;
				this.columnId = options.columnId;
				this.sortType = options.sortType;
			},

			serializeData: function(){

				return {
					columnName: this.columnName,
					columnId: this.columnId,
					sortType: this.sortType,
					//numElems: this.collection.length
				}
			},

			newTask: function(){
		    	console.log("new:clicked");

		    	$('.newTask').slideUp(function(){
		    		$('.inputTask').slideDown(function(){
		    			$('input').focus();
		    		});
		    	});

		    	// keypress event
				var that = this;
				$('input').keypress(function(ev){
					if(ev.which == 13) {
						that.submitTask();
					}
				});
		    	
		    	this.trigger("task:new");
		    },

		    submitTask: function(){
		    	var text = $('#newTask').val();
		    	console.log(text);
		    	this.trigger("task:submit", text);

		    	window.setTimeout(function(){
		    		$('.inputTask').slideUp(function(){
		    			$('.newTask').slideDown(function(){
		    				$('#newTask').val('');
		    			});
		    		}); 
		    	}, 500 );

		    },

		    customSort: function(e){
		    	console.log("column:customsort");
		    	var column = this.columnId;
		    	this.options.viewComparator = 'position';
		    	this.collection.sort();
		    	this.activateStyles(column,'.customSort');
		    },

		    dateCreatedSort: function(e){
		    	console.log("column:datecreatedsort");
		    	var column = this.columnId;

		    	$('#'+column+'-column span').removeClass("selected");
	    		$('#'+column+'-column span.dateCreatedSort')
	    			.addClass("selected dateCreatedSortInverse")
	    			.removeClass("dateCreatedSort");

		    	this.options.viewComparator = function(model) { 
		    		return (new Date(model.get('dateCreated'))).getTime(); 
		    	};
		    	
		    	this.collection.sort();
		    },

		    dateCreatedSortInverse: function(e){
		    	console.log("column:datecreatedsortinverse");
		    	var column = this.columnId;

		    	$('#'+column+'-column span').removeClass("selected");
	    		$('#'+column+'-column span.dateCreatedSortInverse')
	    			.addClass("selected dateCreatedSort")
	    			.removeClass("dateCreatedSortInverse");

		    	this.options.viewComparator = function(model) { 
		    		return -(new Date(model.get('dateCreated'))).getTime(); 
		    	};
		    	this.collection.sort();		    	
		   	},

		    dateCompletedSort: function(e){
		    	console.log("column:datecompletedsort");
		    	var column = this.columnId;

		    	$('#'+column+'-column span').removeClass("selected");
	    		$('#'+column+'-column span.dateCompletedSort')
	    			.addClass("selected dateCompletedSortInverse")
	    			.removeClass("dateCompletedSort");

		    	this.options.viewComparator = function(model) { 
		    		return (new Date(model.get('dateCompleted'))).getTime(); 
		    	};
		    	this.collection.sort();	
		    },

		    dateCompletedSortInverse: function(e){
				console.log("column:datecompletedsortinverse");
		    	var column = this.columnId;

		    	$('#'+column+'-column span').removeClass("selected");
	    		$('#'+column+'-column span.dateCompletedSortInverse')
	    			.addClass("selected dateCompletedSort")
	    			.removeClass("dateCompletedSortInverse");

		    	this.options.viewComparator = function(model) { 
		    		return -(new Date(model.get('dateCompleted'))).getTime(); 
		    	};
		    	this.collection.sort();	
			},

		    activateStyles: function(column, id){
		    	$('#'+column+'-column span').removeClass("selected");
		    	$('#'+column+'-column span'+id).addClass("selected");
		    },

			onRender: function(){

				// highlighting whole row when hovering submit
				$('.inputTask .glyphicon').hover(function(){
				    $(this).parent().toggleClass('light');
				    $('.inputTask input').toggleClass('light');
				});

				require(["jqueryui"], function(){
					var oldList, newList, item;
					$('.column-list').sortable({
						connectWith: '.column-list',
						items: ".task",
						cancel: ".newTask,[contenteditable]",
				        start: function(event, ui) {
				        	console.log("start");
				            item = ui.item;
				            newList = oldList = ui.item.parent();
				        },
				        stop: function(event, ui) {  
				        	console.log("stop");  
				        	var index = ui.item.index();     
				        	// index offset fix for backlog
				            if(newList.attr('id') == 'backlog') index = index - 2;
				        	ui.item.trigger('drop', [index, oldList.attr('id'), newList.attr('id')]);
				        },
				        change: function(event, ui) {  
				            if(ui.sender) newList = ui.placeholder.parent();
				        }
			   		});
			   	});

				require(["bootstrap"], function(){
					
					$('[data-toggle="tooltip"]').tooltip();
				});

			   	
				

			   	this.ui.counter.text(this.collection.length);
			   	console.log(this.collection.length);
			   	// console.log(this.columnId);
			   	// console.log(this.cid);
			   	// console.log(this);
			   	//debugger;
			}

		});

		View.confirmDeleteView = Marionette.ItemView.extend({
			template: confirmDeleteTpl,

			events: {
				"click .deleteConfirmation": "deleteConfirmation"
			},

			deleteConfirmation: function(){
				this.trigger("confirm:delete");
			}
		});
	});

	return App.KanbanApp.Show.View;
});