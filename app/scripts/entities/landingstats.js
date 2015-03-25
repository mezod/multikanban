define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.LandingStats = Backbone.Model.extend({

      fetch: function(options){
        this.url = "/multikanban-api/web/stats";

        //Call Backbone's fetch
        return Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    var API = {
      getLandingStats: function(){
        Entities.landingstats = new Entities.LandingStats();
        var defer = $.Deferred();
        Entities.landingstats.fetch({
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        return promise;
      }
    };

    App.reqres.setHandler("landingstats:entities", function(){
      return API.getLandingStats();
    });
  });

  return ;
});
