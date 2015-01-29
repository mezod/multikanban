define([
	'app',
	"tpl!apps/main/show/templates/layout.tpl"
], function(App, layoutTpl){
	App.module("MainApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Layout = Marionette.LayoutView.extend({
			template: layoutTpl,
			id: 'layout',

			regions: {
				headerRegion: "#header",
				footerRegion: "#footer",
				mainRegion: "#main-region"
			}
		});
	});

	return App.MainApp.Show.View;
});