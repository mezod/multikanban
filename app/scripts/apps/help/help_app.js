define([
  "app"
], function(App){
  App.module("HelpApp", function(HelpApp, App, Backbone, Marionette, $, _){

    App.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "help" : "showHelp"
      },

      execute: function(attributes, options){
        if(App.loggedInUser === undefined){
          console.log('no loggedInUser');
          App.trigger("landing:show");
          return;
        } 

        //redefine execute must call original execute
        return Marionette.AppRouter.prototype.execute.call(this, attributes, options);
      }
    });

    var API = {
      showHelp: function(){
        require(["apps/help/show/show_controller"], function(ShowController){
          if(!App.mainLayout || App.mainLayout.isDestroyed) App.trigger("create:layout");
          ShowController.showHelp();
        });
      }
    };

    App.on("help:show", function(){
      console.log("weee");
      
      App.navigate("help");
      API.showHelp();
    });

    App.addInitializer(function(){
      new App.Router({
        controller: API
      });
    });
  });

  return App;
});

