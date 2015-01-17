define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.CompletedTask = Backbone.Model.extend();

    Entities.CompletedTaskCollection = Backbone.Collection.extend({
      model: Entities.CompletedTask
    });

    var initializeCompletedTasks = function(){
      Entities.completedtasks = new Entities.CompletedTaskCollection([
        { date: "17/01/2015", task: "eat mushrooms", kanban: "diet" },
        { date: "17/01/2015", task: "cook soup", kanban: "diet" },
        { date: "17/01/2015", task: "run 10km", kanban: "fitness" },
        { date: "17/01/2015", task: "write a post", kanban: "personal blog" },
      ]);
    };

    var API = {
      getCompletedTasks: function(){
        if(Entities.completedtasks === undefined){
          initializeCompletedTasks();
        }
        return Entities.completedtasks;
      }
    };

    App.reqres.setHandler("home:entities", function(){
      return API.getCompletedTasks();
    });
  });

  return ;
});
