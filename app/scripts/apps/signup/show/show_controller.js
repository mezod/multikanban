define([
	'app',
	'apps/signup/show/show_view'
], function(App, View){
	App.module("SignupApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showSignup: function(){

				var signupShowView = new View.Signup();

				signupShowView.on("signup", function(){

					console.log("signup");
					//signup logic

					

			      

			
					
				});

				App.contentRegion.show(signupShowView);
			}
		}
	});

	return App.SignupApp.Show.Controller;
});