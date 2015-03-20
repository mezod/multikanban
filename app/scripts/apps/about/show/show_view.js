define([
	'app',
	"tpl!apps/about/show/templates/about.tpl"
], function(App, aboutTpl){
	App.module("AboutApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.About = Marionette.ItemView.extend({
			template: aboutTpl
		});
	});

	return App.AboutApp.Show.View;
});