define(["marionette"], function(Marionette){

	var App = new Marionette.Application();

	App.addRegions({
		headerRegion: "#header",
		footerRegion: "#footer",
		mainRegion: "#main-region"
	});

	App.navigate = function(route,  options){
	    options || (options = {});
	    Backbone.history.navigate(route, options);
	};

	App.on("start", function(){
	    if(Backbone.history){
	      	console.log("App started!")
	        require(["apps/home/home_app", "apps/kanban/kanban_app"], function(){
	        	Backbone.history.start();
	        }); 
	    }
	});

	return App;
});
