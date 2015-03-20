define([
  "app"
], function(App){
  App.module("LoginApp", function(LoginApp, App, Backbone, Marionette, $, _){

    App.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "login" : "showLogin"
      },

      execute: function(attributes, options){

        if(!! App.loggedInUser){
          console.log("show home");
          App.trigger("home:show");
          return;
        }

        return Marionette.AppRouter.prototype.execute.call(this, attributes, options);
      }
    });

    var API = {
      showLogin: function(){
 
        require(["apps/login/show/show_controller"], function(ShowController){
          ShowController.showLogin();
        });
      }
    };

    App.on("login:show", function(){
      console.log("login:show");
      
      App.navigate("login");
      API.showLogin();
    });

    App.addInitializer(function(){
      new App.Router({
        controller: API
      });
    });
  });

  return App.App;
});