define(["marionette"], function(Marionette){

	var App = new Marionette.Application();

	App.addRegions({
		contentRegion: "#content"
	});

	App.navigate = function(route,  options){
	    options || (options = {});
	    Backbone.history.navigate(route, options);
	};

    App.getCurrentRoute = function(){
    	console.log(Backbone.history);
    	console.log(Backbone.history.fragment);
    	return Backbone.history.fragment;
    };

	App.on("start", function(){
	    if(Backbone.history){
	      	console.log("App started!")
	        require([
	        		"apps/home/home_app", 
	        		"apps/kanban/kanban_app", 
	        		"apps/landing/landing_app", 
	        		"apps/menu/menu_app", 
	        		"apps/main/main_app",
	        		"apps/login/login_app",
	        		"apps/signup/signup_app"
	        		], function(){
	        	Backbone.history.start();

	        	var currentRoute = App.getCurrentRoute();
	        	if(currentRoute === undefined){
		        	console.log("undefined current route");
		        	App.trigger("landing:show");
		        }else if(currentRoute != "login" && currentRoute != "signup" && (App.loggedInUser === undefined)){
		        	console.log('go to landing');
		        	App.trigger("landing:show");
		        }
	        }); 

	        
	    }
	});

	// Easing development by referencing the app to be used in console for debugging.
	window.App = App;

	return App;
});
