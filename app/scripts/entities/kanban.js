define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Kanban = Backbone.Model.extend({
      initialize: function(){

      }
    });

    Entities.KanbanCollection = Backbone.Collection.extend({
      url: "../../multikanban-api/web/users/2/kanbans",
      model: Entities.Kanban,

      initialize: function(){

      }
    });

    // Dummy kanbans
    var initializeKanbans = function(){
      Entities.kanbans = new Entities.KanbanCollection([
        { name: "general", url: "kanban"},
        { name: "personal blog", url: "kanban"}
      ]);
    };

    var API = {
      getKanbans: function(){
        // if(Entities.kanbans === undefined){
        //   initializeKanbans();
        // }
        Entities.kanbans = new Entities.KanbanCollection();
        Entities.kanbans.fetch({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','token ABCD123');
          },
          success: function(data){
            console.log(data);
          }
        });

        return Entities.kanbans;
      }
    };

    App.reqres.setHandler("kanban:entities", function(){
      return API.getKanbans();
    });
  });

  return ;
});