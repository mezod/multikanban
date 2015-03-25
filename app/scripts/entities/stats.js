define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.Stats = Backbone.Model.extend({

      fetch: function(options){
        this.url = "/multikanban-api/web/users/"+App.loggedInUser.id+"/stats";

        //Call Backbone's fetch
        return Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    var API = {
      getStats: function(){
        Entities.stats = new Entities.Stats();
        var defer = $.Deferred();
        Entities.stats.fetch({
          beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization','token '+App.loggedInUser.token);
          },
          success: function(data){
            defer.resolve(data);
          }
        });
        var promise = defer.promise();
        return promise;
      }
    };

    App.reqres.setHandler("stats:entities", function(){
      return API.getStats();
    });
  });

  return ;
});
