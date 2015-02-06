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

			triggers: {
				"click .brand": "home:clicked",
				"click .profile": "home:clicked",
				"click li a": "kanban:clicked",
				"click .logout": "logout:clicked",
				"click .submitKanban": "kanban:submit"
			},

			events: {
		        "click .newKanban": "newClicked"
		    },

		    newClicked: function(){
		    	console.log("new:clicked");

		    	$('.newKanban').slideUp(function(){
		    		$('.inputKanban').slideDown(function(){
		    			$('input').focus();
		    		});
		    	});
		    	
		    	App.trigger("kanban:new");
		    },

			// Adds the list of kanbans before the add kanban button
			attachHtml: function(collectionView, itemView){

			    collectionView.$(".newKanban").before(itemView.el);
			},

			serializeData: function(){

				return {
					nickname: App.loggedInUser.username,
				}
			},

			onShow : function(){

				// highlighting whole row when hovering submit
				$('.inputKanban .glyphicon').hover(function(){
				    $(this).parent().toggleClass('light');
				    $('.inputKanban input').toggleClass('light');

				})
			}

		});
	});

	return App.MenuApp.List.View;
});