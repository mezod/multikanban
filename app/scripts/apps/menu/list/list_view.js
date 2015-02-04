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
			tagName: "aside",
			className: "sitenav",
			template: listTpl,
			childView: View.Kanban,

			events: {
		        "click .brand": "homeClicked",
		        "click .profile": "homeClicked",
		        "click li a": "kanbanClicked",
		        "click .logout": "logoutClicked"
		    },

		    homeClicked: function(e){
		        e.preventDefault();
		        this.trigger("home:clicked");
		    },

		    kanbanClicked: function(e){
		    	e.preventDefault();
		        this.trigger("kanban:clicked");
		    },

		    logoutClicked: function(e){
		    	console.log("logout:clicked");
		    	e.preventDefault();
		    	this.trigger("logout:clicked");
		    },

			// Adds the list of kanbans before the add kanban button
			attachHtml: function(collectionView, itemView){

			    collectionView.$(".newKanban").before(itemView.el);
			},

			serializeData: function(){

				return {
					nickname: App.loggedInUser.username,
				}
			}

		});
	});

	return App.MenuApp.List.View;
});