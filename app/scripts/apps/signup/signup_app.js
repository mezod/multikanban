define([
  "app"
], function(App){
  App.module("SignupApp", function(SignupApp, App, Backbone, Marionette, $, _){

    SignupApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "signup" : "showSignup"
      }
    });

    var API = {
      showSignup: function(){

        if(!! App.loggedInUser){
            App.trigger("show:home");
        }else{
            require(["apps/signup/show/show_controller"], function(ShowController){
              ShowController.showSignup();
            });
        }
        
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