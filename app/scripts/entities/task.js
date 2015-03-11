define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Task = Backbone.Model.extend({

      initialize: function(options){

        this.kanban_id = options.kanban_id;
      },

      sync: function(method, model, options) {
        options || (options = {});

        options.headers = { 'Authorization' : 'token '+App.loggedInUser.token };

        switch (method) {
            case "create":
                options.url = "/multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+this.kanban_id+"/tasks";
                break;
            case "read":
                options.url = "/multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+this.kanban_id+"/tasks/"+model.get("id");
                break;
            case "delete":
                options.url = "/multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+this.kanban_id+"/tasks/"+model.get("id");
                break;
            case "update":
                options.url = "/multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+this.kanban_id+"/tasks/"+model.get("id");
                break;
        }

        if (options.url)
            return Backbone.sync.call(model, method, model, options);
      }
    });

    Entities.TaskCollection = Backbone.Collection.extend({
      model: Entities.Task,
      comparator: "position",

      initialize: function(collection, options){

        this.url = "/multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+options.kanban_id+"/tasks/"+options.state;
      }
    });

    var API = {
      getTasks: function(state, kanban_id){
        Entities.tasks = new Entities.TaskCollection([], {'state' : state, 'kanban_id': kanban_id});
        var defer = $.Deferred();
        Entities.tasks.fetch({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','token '+App.loggedInUser.token);
          },
          success: function(data){
            defer.resolve(data);
          }
        });

        var promise = defer.promise();
        return promise;
      }
    };

    App.reqres.setHandler("backlog:task:entities", function(kanban_id){
      return API.getTasks("backlog", kanban_id);
    });
    App.reqres.setHandler("todo:task:entities", function(kanban_id){
      return API.getTasks("todo", kanban_id);
    });
    App.reqres.setHandler("doing:task:entities", function(kanban_id){
      return API.getTasks("doing", kanban_id);
    });
    App.reqres.setHandler("onhold:task:entities", function(kanban_id){
      return API.getTasks("onhold", kanban_id);
    });
    App.reqres.setHandler("done:task:entities", function(kanban_id){
      return API.getTasks("done", kanban_id);
    });
    App.reqres.setHandler("archive:task:entities", function(kanban_id){
      return API.getTasks("archive", kanban_id);
    });

    App.reqres.setHandler("task:entity:new", function(kanban_id){
      return new Entities.Task({'kanban_id': kanban_id});
    });
  });

  return ;
});
