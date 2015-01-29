define([
  "app"
], function(App){
  App.module("FooterApp", function(FooterApp, App, Backbone, Marionette, $, _){
    var API = {
      listFooters: function(){
        require(["apps/footer/show/show_controller"], function(ShowController){
          ShowController.listFooters();
        });
      }
    };

    // Footer.on("start", function(){
    //   API.listFooters();
    // });
    App.on("footer:show", function(){
        console.log("footer:show");
        
      API.listFooters();
    });
  });

  return App.FooterApp;
});