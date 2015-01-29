define([
  "app"
], function(App){
  App.module("MainApp", function(MainApp, App, Backbone, Marionette, $, _){

    var API = {
      createLayout: function(){
        require(["apps/main/show/show_controller"], function(ShowController){
          ShowController.createLayout();
        });
      }
    };

    MainApp.on("start", function(){
      API.createLayout();
    });
  
    return App.MainApp;
  });

});