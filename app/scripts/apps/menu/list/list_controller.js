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

					kanbansListView.on("brand:clicked", function(){
						App.trigger("home:show");
					});

					kanbansListView.on("kanban:clicked", function(){
						App.trigger("kanban:show");
					});

					App.headerRegion.show(kanbansListView);
				});
			}
		}
	});

	return App.MenuApp.List.Controller;
});