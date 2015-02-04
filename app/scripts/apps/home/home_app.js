define([
  "app"
], function(App){
  App.module("HomeApp", function(HomeApp, App, Backbone, Marionette, $, _){

    HomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "home" : "listCompletedTasks"
      },

      execute: function(attributes, options){
        console.log('potato');
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
      listCompletedTasks: function(){
        require(["apps/home/show/show_controller"], function(ShowController){
          if(!App.mainLayout || App.mainLayout.isDestroyed) App.trigger("create:layout");
          ShowController.listCompletedTasks();
        });
      }
    };

    App.on("home:show", function(){
      App.navigate("home");
      API.listCompletedTasks();
    });

    HomeApp.addInitializer(function(){
      new HomeApp.Router({
        controller: API
      });
    });

    return HomeApp.Router;
  });

});