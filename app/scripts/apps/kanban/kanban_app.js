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
          App.trigger("create:layout");
          ShowController.showTasks();
        });
      }
    };

    App.on("kanban:show", function(){
      App.navigate("kanban");
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