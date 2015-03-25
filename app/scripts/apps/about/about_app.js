define([
  "app"
], function(App){
  App.module("AboutApp", function(AboutApp, App, Backbone, Marionette, $, _){

    App.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "about" : "showAbout"
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
      showAbout: function(){
        require(["apps/about/show/show_controller"], function(ShowController){
          if(!App.mainLayout || App.mainLayout.isDestroyed) App.trigger("create:layout");
          ShowController.showAbout();
        });
      }
    };

    App.on("about:show", function(){
      console.log("weee");
      
      App.navigate("about");
      API.showAbout();
    });

    App.addInitializer(function(){
      new App.Router({
        controller: API
      });
    });
  });

  return App;
});

