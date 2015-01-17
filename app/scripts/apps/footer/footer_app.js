define([
  "app"
], function(App){
  App.module("FooterApp", function(Footer, App, Backbone, Marionette, $, _){
    var API = {
      listFooters: function(){
        require(["apps/footer/show/show_controller"], function(ShowController){
          ShowController.listFooters();
        });
      }
    };

    Footer.on("start", function(){
      API.listFooters();
    });
  });

  return App.FooterApp;
});