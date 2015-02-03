define([
	'app',
	"tpl!apps/signup/show/templates/signup.tpl",
], function(App, signupTpl){
	App.module("SignupApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Signup = Marionette.ItemView.extend({
			template: signupTpl,

			events: {
				"click button": "signupClicked"
			},

			signupClicked: function(e){
				console.log("signup Button Clicked");

				e.preventDefault();
				this.trigger("signup");
			}
		});
	});

	return App.SignupApp.Show.View;
});