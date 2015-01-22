define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Task = Backbone.Model.extend({
      initialize: function(){

      }
    });

    Entities.TaskCollection = Backbone.Collection.extend({
      model: Entities.Task,

      initialize: function(){

      }
    });

    // Dummy Tasks
    var initializeTasks = function(){
      Entities.tasks = new Entities.TaskCollection([
        {
        "id": "13",
        "user_id": "2",
        "kanban_id": "7",
        "text": "write the abstract",
        "dateCreated": "2015-01-06",
        "dateCompleted": "2015-01-06",
        "position": "1",
        "state": "to do"
        },
        {
        "id": "15",
        "user_id": "2",
        "kanban_id": "7",
        "text": "Write the summary",
        "dateCreated": "2015-01-07",
        "dateCompleted": null,
        "position": "0",
        "state": "backlog"
        },
        {
        "id": "16",
        "user_id": "2",
        "kanban_id": "7",
        "text": "Write the summary",
        "dateCreated": "2015-01-07",
        "dateCompleted": null,
        "position": "0",
        "state": "backlog"
        }
      ]);
    };

    var API = {
      getTasks: function(){
        if(Entities.tasks === undefined){
          initializeTasks();
        }
        return Entities.tasks;
      }
    };

    App.reqres.setHandler("task:entities", function(){
      return API.getTasks();
    });
  });

  return ;
});
