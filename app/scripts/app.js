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
	        require(["apps/home/home_app", "apps/kanban/kanban_app", "apps/landing/landing_app", "apps/menu/menu_app", "apps/main/main_app"], function(){
	        	Backbone.history.start();
	        }); 

	        // if(this.getCurrentRoute() === undefined){
	        // 	console.log("fragment");
	        // 	App.trigger("landing:show");
	        // }
	    }
	});

	return App;
});
