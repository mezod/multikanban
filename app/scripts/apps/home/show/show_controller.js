define([
	'app',
	'apps/home/show/show_view'
], function(App, View){
	App.module("HomeApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			listCompletedTasks: function(){
				require(["entities/completedtasks"], function(){
					var completedTasks = App.request("home:entities");

					var homeShowView = new View.Homes({
						collection: completedTasks
					});

					App.mainRegion.show(homeShowView);
				});
			}
		}
	});

	return App.HomeApp.Show.Controller;
});