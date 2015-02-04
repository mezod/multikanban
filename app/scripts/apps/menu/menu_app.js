define([
  "app"
], function(App){
  App.module("MenuApp", function(MenuApp, App, Backbone, Marionette, $, _){
    var API = {
      listKanbans: function(){
        require(["apps/menu/list/list_controller"], function(ListController){
          ListController.listKanbans();
        });
      }
    };
    
    App.on("menu:show", function(){
      console.log("menu:show");
      
      API.listKanbans();
    });
  });

  return App.MenuApp;
});