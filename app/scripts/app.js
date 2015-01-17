define(["marionette"], function(Marionette){

	var App = new Marionette.Application();

	App.addRegions({
		headerRegion: "#header",
		footerRegion: "#footer",
		mainRegion: "#main-region"
	});

	App.on("start", function(){
	    if(Backbone.history){
	      	console.log("App started!")
	        require(["apps/home/home_app"], function(){
	        	Backbone.history.start();
	        }); 
	    }
	});

	return App;
});
