define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Kanban = Backbone.Model.extend({
      initialize: function(){

      },

      // fetch: function(options){
      //   this.url = "../../multikanban-api/web/users/"+App.loggedInUser.id+"/kanbans/"+this.id;

      //   //Call Backbone's fetch
      //   return Backbone.Collection.prototype.fetch.call(this, options);
      // }
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