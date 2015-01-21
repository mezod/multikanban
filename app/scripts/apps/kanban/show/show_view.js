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
			template: headerTpl
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