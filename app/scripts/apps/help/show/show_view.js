define([
	'app',
	"tpl!apps/help/show/templates/help.tpl"
], function(App, helpTpl){
	App.module("HelpApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Help = Marionette.ItemView.extend({
			template: helpTpl
		});
	});

	return App.HelpApp.Show.View;
});