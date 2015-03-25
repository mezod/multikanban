define([
  "app"
], function(App){
  App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
    Entities.CompletedTask = Backbone.Model.extend();

    Entities.CompletedTaskCollection = Backbone.Collection.extend({
      model: Entities.CompletedTask,
      comparator: function(model) { 
            return -(new Date(model.get('dateCompleted'))).getTime(); 
          },

      fetch: function(options){
        this.url = "/../../multikanban-api/web/users/"+App.loggedInUser.id+"/completedtasks";

        //Call Backbone's fetch
        return Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    // var initializeCompletedTasks = function(){
    //   Entities.completedtasks = new Entities.CompletedTaskCollection([
    //     { date: "17/01/2015", task: "eat mushrooms", kanban: "diet" },
    //     { date: "17/01/2015", task: "cook soup", kanban: "diet" },
    //     { date: "17/01/2015", task: "run 10km", kanban: "fitness" },
    //     { date: "17/01/2015", task: "write a post", kanban: "personal blog" },
    //   ]);
    // };

    var API = {
      getCompletedTasks: function(){
        Entities.completedtasks = new Entities.CompletedTaskCollection();
        var defer = $.Deferred();
        Entities.completedtasks.fetch({
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

    App.reqres.setHandler("home:entities", function(){
      return API.getCompletedTasks();
    });
  });

  return ;
});
