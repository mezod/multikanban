define([
  "app"
], function(App){
  App.module("SignupApp", function(SignupApp, App, Backbone, Marionette, $, _){

    SignupApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "signup" : "showSignup"
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
      showSignup: function(){

        require(["apps/signup/show/show_controller"], function(ShowController){
          ShowController.showSignup();
        });    
      }
    };

    SignupApp.on("signup:show", function(){
      console.log("signup:show");
      
      App.navigate("signup");
      API.showSignup();
    });

    SignupApp.addInitializer(function(){
      new SignupApp.Router({
        controller: API
      });
    });
  });

  return App.SignupApp;
});