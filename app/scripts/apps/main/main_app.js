define([
  "app"
], function(App){
  App.module("MainApp", function(MainApp, App, Backbone, Marionette, $, _){

    var API = {
      createLayout: function(){
        require(["apps/main/show/show_controller"], function(ShowController){
          ShowController.createLayout();
        });
      },

      retrieveUser: function(){
        require(["apps/main/show/show_controller"], function(ShowController){
          ShowController.retrieveUser();
        });
      }
    };

    MainApp.on("start", function(){
      API.createLayout();
      API.retrieveUser();
    });
  
    return App.MainApp;
  });

});