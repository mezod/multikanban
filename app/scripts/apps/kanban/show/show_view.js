define([
	'app',
	"tpl!apps/kanban/show/templates/kanban_layout.tpl",
	"tpl!apps/kanban/show/templates/kanban_header.tpl",
	"tpl!apps/kanban/show/templates/column.tpl",
	"tpl!apps/kanban/show/templates/task.tpl"
], function(App, layoutTpl, headerTpl, columnTpl, taskTpl){
	App.module("KanbanApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Layout = Marionette.LayoutView.extend({
			template: layoutTpl,

			regions: {
				kanbanHeader: "#kanban-header",
				backlog: "#backlog",
				todo: "#todo",
				doing: "#doing",
				onhold: "#onhold",
				done: "#done",
				archive: "#archive"
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
			className: "task"
		});

		View.Column = Marionette.CompositeView.extend({
			template: columnTpl,
			childView: View.Task,
			childViewContainer: 'ul',

			initialize: function(options){

				this.columnName = options.columnName;
				this.sortType = options.sortType;
			},

			serializeData: function(){

				return {
					columnName: this.columnName,
					sortType: this.sortType
				}
			}


		});
	});

	return App.KanbanApp.Show.View;
});