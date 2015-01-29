define([
	'app',
	'apps/landing/show/show_view'
], function(App, View){
	App.module("LandingApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showLanding: function(){

				var landingShowView = new View.Landing();

				App.contentRegion.show(landingShowView);
			}
		}
	});

	return App.LandingApp.Show.Controller;
});