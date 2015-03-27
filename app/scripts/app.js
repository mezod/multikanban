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

    	return Backbone.history.fragment;
    };

	App.on("start", function(){
	    if(Backbone.history){
	      	console.log("App started!")
	        require([
	        		"apps/main/main_app",
	        		"apps/home/home_app", 
	        		"apps/kanban/kanban_app", 
	        		"apps/landing/landing_app", 
	        		"apps/menu/menu_app", 
	        		"apps/login/login_app",
	        		"apps/signup/signup_app",
	        		"apps/footer/footer_app",
	        		"apps/about/about_app",
	        		"apps/help/help_app"
	        		], function(){
	        	if(window.localStorage["multikanban user"]){

					App.loggedInUser = JSON.parse(window.localStorage.getItem('multikanban user'));
				}

	        	Backbone.history.start({pushState: true});

	        	if(App.getCurrentRoute() === undefined){

		        	App.trigger("landing:show");
		        }
	        }); 

	        
	    }
	});

	// Easing development by referencing the app to be used in console for debugging.
	window.App = App;

	return App;
});
