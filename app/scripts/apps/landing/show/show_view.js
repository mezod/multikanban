define([
	'app',
	"tpl!apps/landing/show/templates/landing.tpl",
], function(App, landingTpl){
	App.module("LandingApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Landing = Marionette.ItemView.extend({
			template: landingTpl
		});
	});

	return App.LandingApp.Show.View;
});