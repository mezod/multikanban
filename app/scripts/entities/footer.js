define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Footer = Backbone.Model.extend();

    Entities.FooterCollection = Backbone.Collection.extend({
      model: Entities.Footer
    });

    var initializeFooters = function(){
      Entities.footers = new Entities.FooterCollection([
        { name: "Help", url: "help", navigationTrigger: "help:show" },
        { name: "About", url: "about", navigationTrigger: "about:show" }
      ]);
    };

    var API = {
      getFooters: function(){
        if(Entities.footers === undefined){
          initializeFooters();
        }
        return Entities.footers;
      }
    };

    App.reqres.setHandler("footer:entities", function(){
      return API.getFooters();
    });
  });

  return ;
});
