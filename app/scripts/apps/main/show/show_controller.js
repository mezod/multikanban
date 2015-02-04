define([
	'app',
	'apps/main/show/show_view'
], function(App, View){
	App.module("MainApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			createLayout: function(){

				
				App.on("create:layout", function(){

					//layout
					App.mainLayout = new View.Layout();

					console.log("create:layout");

			      	// Check if layout is already loaded.
			      	if(App.contentRegion.currentView == App.mainLayout){
			      		console.log('already loaded');
			      		return; 
			      	}  
			      
				    $.when(App.contentRegion.show(App.mainLayout)).done(function(){
				      	App.trigger("menu:show");
				      	App.trigger("footer:show");
					});    

			    });	
			},

			retrieveUser: function(){

				console.log(window.localStorage["multikanban user"]);
				if(window.localStorage["multikanban user"]){
					console.log('localStorage exists');
					App.loggedInUser = JSON.parse(window.localStorage.getItem('multikanban user'));
				}
			}
		}
	});

	return App.MainApp.Show.Controller;
});