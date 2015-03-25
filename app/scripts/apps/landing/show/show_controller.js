define([
	'app',
	'apps/landing/show/show_view'
], function(App, View){
	App.module("LandingApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showLanding: function(){

				require(["entities/landingstats"], function(){
					var landingstatsFetch = App.request("landingstats:entities");
					
					$.when(landingstatsFetch)
					 .done(function(landingstats){

						var landingShowView = new View.Landing({
							landingstats: landingstats
						});

						landingShowView.on("landing:show", function(){

							App.trigger("landing:show");
						});

						landingShowView.on("login:show", function(){

							App.trigger("login:show");
						});

						landingShowView.on("signup:show", function(){

							App.trigger("signup:show");
						});

						App.contentRegion.show(landingShowView);
					});

				});
			}
		}
	});

	return App.LandingApp.Show.Controller;
});