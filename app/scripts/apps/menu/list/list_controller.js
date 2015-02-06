define([
	'app',
	'apps/menu/list/list_view'
], function(App, View){
	App.module("MenuApp.List", function(List, App, Backbone, Marionette, $, _){
		List.Controller = {
			listKanbans: function(){
				require(["entities/kanban"], function(){
					var kanbans = App.request("kanban:entities");

					var kanbansListView = new View.Kanbans({
						collection: kanbans
					});

					kanbansListView.on("home:clicked", function(){
						App.trigger("home:show");
					});

					kanbansListView.on("kanban:clicked", function(){
						App.trigger("kanban:show");
					});

					kanbansListView.on("logout:clicked", function(){

						window.localStorage.removeItem('multikanban user');
						App.loggedInUser = undefined;
						App.trigger("landing:show");
					});

					kanbansListView.on("kanban:new", function(){
		                var newKanban = App.request("kanban:entity:new");

		                var view = new View.Kanban({
		                	model: newKanban
		                });

		                view.on("kanban:submit", function(data){
		               
		                });

		                ContactManager.dialogRegion.show(view);
		            });

					App.mainLayout.headerRegion.show(kanbansListView);
				});
			}
		}
	});

	return App.MenuApp.List.Controller;
});