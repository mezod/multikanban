define([
	'app',
	"tpl!apps/signup/show/templates/signup.tpl",
], function(App, signupTpl){
	App.module("SignupApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Signup = Marionette.ItemView.extend({
			template: signupTpl,
			className: "signup-div",

			triggers: { 
				"click .brand": "landing:show",
				"click .login": "login:show",
				"click .signup": "signup:show"
			},

			events: {
				"click button": "signupClicked"
			},

			signupClicked: function(e){
				console.log("signup Button Clicked");

				e.preventDefault();
				this.trigger("signup");
			},

			onRender: function(){

				require(["bootstrap"], function(){
					$('body').tooltip({   
					   selector: '[data-toggle=tooltip]',
					   container: 'body'
					});
				});
			}
		});
	});

	return App.SignupApp.Show.View;
});