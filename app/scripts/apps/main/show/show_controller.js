define([
	'app',
	'apps/main/show/show_view'
], function(App, View){
	App.module("MainApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			createLayout: function(){

				//layout
				App.mainLayout = new View.Layout();

				App.on("create:layout", function(){

					console.log("create:layout");

			      	// Check if layout is already loaded.
			      	if(App.contentRegion.currentView == App.mainLayout) return;  
			      
				    $.when(App.contentRegion.show(App.mainLayout)).done(function(){
				      	App.trigger("menu:show");
				      	App.trigger("footer:show");
					});    

			    });	
			}
		}
	});

	return App.MainApp.Show.Controller;
});