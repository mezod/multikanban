define([
	'app',
	'apps/footer/show/show_view'
], function(App, View){
	App.module("FooterApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			listFooters: function(){
				require(["entities/footer"], function(){
					var footers = App.request("footer:entities");

					var footersShowView = new View.Footers({
						collection: footers
					});

					footersShowView.on("home:show", function(){
						App.trigger("home:show");
					});

					footersShowView.on("help:show", function(){
						App.trigger("help:show");
					});

					footersShowView.on("about:show", function(){
						App.trigger("about:show");
					});

					App.mainLayout.footerRegion.show(footersShowView);
				});
			}
		}
	});

	return App.FooterApp.Show.Controller;
});