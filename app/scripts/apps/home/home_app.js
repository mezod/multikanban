define([
  "app"
], function(App){
  App.module("HomeApp", function(HomeApp, App, Backbone, Marionette, $, _){

    HomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "home" : "listCompletedTasks"
      }
    });

    var API = {
      listCompletedTasks: function(){
        require(["apps/home/show/show_controller"], function(ShowController){
          App.trigger("create:layout");
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