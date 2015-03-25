define([
	'app',
	'apps/about/show/show_view'
], function(App, View){
	App.module("AboutApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showAbout: function(){
				
					var aboutShowView = new View.About();

					App.mainLayout.mainRegion.show(aboutShowView);
			}
		}
	});

	return App.AboutApp.Show.Controller;
});