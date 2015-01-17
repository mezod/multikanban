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
	        Backbone.history.start();
	  
	    }
	});

	return App;
});
