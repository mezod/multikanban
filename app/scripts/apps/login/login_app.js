define([
  "app"
], function(App){
  App.module("LoginApp", function(LoginApp, App, Backbone, Marionette, $, _){

    LoginApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "login" : "showLogin"
      }
    });

    var API = {
      showLogin: function(){

        if(!! App.loggedIn){
            App.trigger("show:home");
        }else{
            require(["apps/login/show/show_controller"], function(ShowController){
              ShowController.showLogin();
            });
        }
        
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