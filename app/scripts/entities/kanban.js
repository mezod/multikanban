define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Kanban = Backbone.Model.extend({

      initialize: function(){

      },

      // save: function(attributes, options){
      //   this.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans";
      //   //attributes['headers'] = { 'Authorization' : 'token '+App.loggedInUser.token };
      //   //xhr.setRequestHeader('Authorization','token '+App.loggedInUser.token);
      //   return Backbone.Model.prototype.save.call(this, attributes, options);
      // },

      sync: function(method, model, options) {
        options || (options = {});

        console.log(model);

        options.headers = { 'Authorization' : 'token '+App.loggedInUser.token };

        switch (method) {
            case "create":
                options.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans";
                break;
            case "read":
                options.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+model.get("id");
                break;
            case "delete":
                options.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+model.get("id");
                break;
            case "update":
                options.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+model.get("id");
                break;
        }

        if (options.url)
            return Backbone.sync.call(model, method, model, options);
      }
    });

    Entities.KanbanCollection = Backbone.Collection.extend({
      model: Entities.Kanban,

      initialize: function(){

      },

      fetch: function(options){
        this.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans";

        //Call Backbone's fetch
        return Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    var API = {
      getKanbans: function(){
        Entities.kanbans = new Entities.KanbanCollection();
        Entities.kanbans.fetch({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','token '+App.loggedInUser.token);
          },
          success: function(data){
            console.log(data);
          }
        });

        return Entities.kanbans;
      },

      // getKanban: function(kanbanId){
      //   Entities.kanban = new Entities.Kanban({id: kanbanId});
      //   Entities.kanban.fetch({
      //     beforeSend: function(xhr) {
      //       xhr.setRequestHeader('Authorization','token '+App.loggedInUser.token);
      //     },
      //     success: function(data){
      //       console.log(data);
      //     }
      //   });

      //   return Entities.kanban;
      // }


    };

    App.reqres.setHandler("kanban:entities", function(){
      return API.getKanbans();
    });

    App.reqres.setHandler("kanban:entity", function(id){
      return API.getKanban(id);
    });

    App.reqres.setHandler("kanban:entity:new", function(){
      return new Entities.Kanban();
    });
  });

  return ;
});