define([
  "app"
], function(App){
  App.module("KanbanApp", function(KanbanApp, App, Backbone, Marionette, $, _){
    
    KanbanApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "kanban" : "showTasks"
      }
    });

    var API = {
      showTasks: function(){
        require(["apps/kanban/show/show_controller"], function(ShowController){
          ShowController.showTasks();
        });
      }
    };

    App.on("kanban:show", function(){
      App.navigate("kanban");
      console.log("weeee");
      API.showTasks();
    });

    KanbanApp.addInitializer(function(){
      new KanbanApp.Router({
        controller: API
      });
    });
  
    return App.KanbanApp;
  });

});