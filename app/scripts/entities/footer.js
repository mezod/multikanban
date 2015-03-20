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
        { name: "multikanban", href: "home", target: "no"},
        { name: "Help", href: "help", target: "no"},
        { name: "About", href: "about", target: "no"},
        { name: "Twitter", href: "http://twitter.com/multikanban", target: "yes"},
        { name: "by @mezod", href: "http://twitter.com/mezood", target: "yes"},
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
