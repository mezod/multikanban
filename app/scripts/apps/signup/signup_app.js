define([
  "app"
], function(App){
  App.module("SignupApp", function(SignupApp, App, Backbone, Marionette, $, _){

    App.Router = Marionette.AppRouter.extend({
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

    App.on("signup:show", function(){
      
      App.navigate("signup");
      API.showSignup();
    });

    App.addInitializer(function(){
      new App.Router({
        controller: API
      });
    });
  });

  return App;
});