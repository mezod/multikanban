define([
  "app"
], function(App){
  App.module("MenuApp", function(Menu, App, Backbone, Marionette, $, _){
    var API = {
      listKanbans: function(){
        require(["apps/menu/list/list_controller"], function(ListController){
          ListController.listKanbans();
        });
      }
    };

    Menu.on("start", function(){
      API.listKanbans();
    });
  });

  return App.MenuApp;
});