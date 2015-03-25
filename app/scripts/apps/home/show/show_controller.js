define([
	'app',
	'apps/home/show/show_view'
], function(App, View){
	App.module("HomeApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			listCompletedTasks: function(){
				require(["entities/completedtasks", "entities/stats"], function(){
					var completedTasksFetch = App.request("home:entities");
					var statsFetch = App.request("stats:entities");

					

					$.when(completedTasksFetch, statsFetch)
					 .done(function(completedTasks, stats){

					 	var homeShowView = new View.Homes({
							collection: completedTasks,
							stats: stats
						});

						App.mainLayout.mainRegion.show(homeShowView);
					});
				});
			}
		}
	});

	return App.HomeApp.Show.Controller;
});