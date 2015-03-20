define([
	'app',
	'apps/help/show/show_view'
], function(App, View){
	App.module("HelpApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showHelp: function(){
				
					var helpShowView = new View.Help();

					App.mainLayout.mainRegion.show(helpShowView);
			}
		}
	});

	return App.HelpApp.Show.Controller;
});