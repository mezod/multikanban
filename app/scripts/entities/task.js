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

      initialize: function(options){

        this.url = "/../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+options.kanban_id+"/tasks/"+options.state;
      }
    });

    var API = {
      getTasks: function(state, kanban_id){
        Entities.tasks = new Entities.TaskCollection({'state' : state, 'kanban_id': kanban_id});
        Entities.tasks.fetch({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','token '+App.loggedInUser.token);
          },
          success: function(data){
            //console.log(data);
          }
        });

        return Entities.tasks;
      }
    };

    App.reqres.setHandler("backlog:task:entities", function(kanban_id){
      return API.getTasks("backlog", kanban_id);
    });
    App.reqres.setHandler("todo:task:entities", function(kanban_id){
      return API.getTasks("to do", kanban_id);
    });
    App.reqres.setHandler("doing:task:entities", function(kanban_id){
      return API.getTasks("doing", kanban_id);
    });
    App.reqres.setHandler("onhold:task:entities", function(kanban_id){
      return API.getTasks("on hold", kanban_id);
    });
    App.reqres.setHandler("done:task:entities", function(kanban_id){
      return API.getTasks("done", kanban_id);
    });
    App.reqres.setHandler("archive:task:entities", function(kanban_id){
      return API.getTasks("archive", kanban_id);
    });
  });

  return ;
});
