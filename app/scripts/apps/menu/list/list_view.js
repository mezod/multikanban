define([
	'app',
	"tpl!apps/menu/list/templates/list.tpl",
	"tpl!apps/menu/list/templates/list_item.tpl"
], function(App, listTpl, listItemTpl){
	App.module("MenuApp.List.View", function(View, App, Backbone, Marionette, $, _){

		View.Kanban = Marionette.ItemView.extend({
			tagName: "li",
			template: listItemTpl
		});

		View.Kanbans = Marionette.CompositeView.extend({
			tagName: "ul",
			template: listTpl,
			childView: View.Kanban,

			events: {
		        "click a.brand": "brandClicked",
		        "click li a": "kanbanClicked"
		    },

		    brandClicked: function(e){
		        e.preventDefault();
		        this.trigger("brand:clicked");
		    },

		    kanbanClicked: function(e){
		    	e.preventDefault();
		        this.trigger("kanban:clicked");
		    },

			// Adds the list of kanbans before the add kanban button
			attachHtml: function(collectionView, itemView){

			    collectionView.$(".newKanban").before(itemView.el);
			},

			serializeData: function(){

				return {
					nickname: 'mezod',
				}
			}

		});
	});

	return App.MenuApp.List.View;
});