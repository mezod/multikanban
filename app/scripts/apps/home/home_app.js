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
          ShowController.listCompletedTasks();
        });
      }
    };

    // HomeApp.on("start", function(){
    //   API.listCompletedTasks();
    // });
    HomeApp.on("home:show", function(){
      HomeApp.navigate("home");
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