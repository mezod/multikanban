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

					App.footerRegion.show(footersShowView);
				});
			}
		}
	});

	return App.FooterApp.Show.Controller;
});