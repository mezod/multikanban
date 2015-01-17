define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    
    Entities.Kanban = Backbone.Model.extend({
      initialize: function(){

      }
    });

    Entities.KanbanCollection = Backbone.Collection.extend({
      model: Entities.Kanban,

      initialize: function(){

      }
    });

    // Dummy kanbans
    var initializeKanbans = function(){
      Entities.kanbans = new Entities.KanbanCollection([
        { name: "general" },
        { name: "personal blog" }
      ]);
    };

    var API = {
      getKanbans: function(){
        if(Entities.kanbans === undefined){
          initializeKanbans();
        }
        return Entities.kanbans;
      }
    };

    App.reqres.setHandler("kanban:entities", function(){
      return API.getKanbans();
    });
  });

  return ;
});
