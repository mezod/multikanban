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
        { name: "multikanban", url: "mutikanban", navigationTrigger: "help:show" },
        { name: "Help", url: "help", navigationTrigger: "help:show" },
        { name: "About", url: "about", navigationTrigger: "about:show" },
        { name: "Terms", url: "terms", navigationTrigger: "help:show" },
        { name: "by @mezod", url: "http://twitter.com/mezood", navigationTrigger: "help:show" },
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
