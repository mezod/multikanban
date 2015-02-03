define([
  "app"
], function(App){
  App.module("LandingApp", function(LandingApp, App, Backbone, Marionette, $, _){

    LandingApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "" : "showLanding"
      }
    });

    var API = {
      showLanding: function(){
        require(["apps/landing/show/show_controller"], function(ShowController){
          ShowController.showLanding();
        });
      }
    };

    App.on("landing:show", function(){
      console.log("weee");
      
      App.navigate("");
      API.showLanding();
    });

    LandingApp.addInitializer(function(){
      new LandingApp.Router({
        controller: API
      });
    });
  });

  return App.LandingApp;
});

