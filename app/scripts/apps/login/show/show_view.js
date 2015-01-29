define([
	'app',
	"tpl!apps/login/show/templates/login.tpl",
], function(App, loginTpl){
	App.module("LoginApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Login = Marionette.ItemView.extend({
			template: loginTpl,

			events: {
				"click button": "loginClicked"
			},

			loginClicked: function(e){
				console.log("login Button Clicked");

				e.preventDefault();
				this.trigger("login");
			}
		});
	});

	return App.LoginApp.Show.View;
});