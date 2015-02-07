define([
	'app',
	"tpl!apps/menu/list/templates/list.tpl",
	"tpl!apps/menu/list/templates/list_item.tpl"
], function(App, listTpl, listItemTpl){
	App.module("MenuApp.List.View", function(View, App, Backbone, Marionette, $, _){

		View.Kanban = Marionette.ItemView.extend({
			tagName: "li",
			template: listItemTpl,

			serializeData: function(){

				var data = this.model.toJSON();
				data.nickname = App.loggedInUser.username;
					
				return data;
			}
		});

		View.Kanbans = Marionette.CompositeView.extend({
			tagName: "aside",
			className: "sitenav",
			template: listTpl,
			childView: View.Kanban,

			triggers: {
				"click .brand": "home:clicked",
				"click .profile": "home:clicked",
				"click .logout": "logout:clicked"
			},

			events: {
				"click li a": "kanbanClicked",
		        "click .newKanban": "newClicked",
		        "click .submitKanban": "kanbanSubmitted"
		    },		    

		    kanbanClicked: function(e){
		    	console.log("kanban:clicked");
		    	e.preventDefault();
		    	
		    	var href = e.currentTarget.attributes[0].nodeValue;

		    	this.trigger("kanban:clicked", href);
		    },

		    newClicked: function(){
		    	console.log("new:clicked");

		    	$('.newKanban').slideUp(function(){
		    		$('.inputKanban').slideDown(function(){
		    			$('input').focus();
		    		});
		    	});
		    	
		    	this.trigger("kanban:new");
		    },

		    kanbanSubmitted: function(){
		    	var title = $('#newKanban').val();
		    	console.log(title);
		    	this.trigger("kanban:submit", title);
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