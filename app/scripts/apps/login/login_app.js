define([
  "app"
], function(App){
  App.module("LoginApp", function(LoginApp, App, Backbone, Marionette, $, _){

    LoginApp.Router = Marionette.AppRouter.extend({
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

    LoginApp.on("login:show", function(){
      console.log("login:show");
      
      App.navigate("login");
      API.showLogin();
    });

    LoginApp.addInitializer(function(){
      new LoginApp.Router({
        controller: API
      });
    });
  });

  return App.LoginApp;
});