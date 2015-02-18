define([
  "app"
], function(App){
  App.module("KanbanApp", function(KanbanApp, App, Backbone, Marionette, $, _){
    
    KanbanApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "kanban/:id" : "showTasks"
      },

      execute: function(attributes, options){

        if(App.loggedInUser === undefined){
          App.trigger("landing:show");
          return;
        } 

        //redefine execute must call original execute
        return Marionette.AppRouter.prototype.execute.call(this, attributes, options);
      }
    });

    var API = {
      showTasks: function(id){
        require(["apps/kanban/show/show_controller"], function(ShowController){
          if(!App.mainLayout || App.mainLayout.isDestroyed) App.trigger("create:layout");
          ShowController.showTasks(id);
        });
      }
    };

    App.on("kanban:show", function(href){
      App.navigate(href);

      var fragment = href.split("/");

      API.showTasks(fragment[1]);
    });

    KanbanApp.addInitializer(function(){
      new KanbanApp.Router({
        controller: API
      });
    });
  
    return App.KanbanApp;
  });

});