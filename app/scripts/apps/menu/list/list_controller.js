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

					App.headerRegion.show(kanbansListView);
				});
			}
		}
	});

	return App.MenuApp.List.Controller;
});