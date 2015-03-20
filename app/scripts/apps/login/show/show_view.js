define([
	'app',
	"tpl!apps/login/show/templates/login.tpl",
], function(App, loginTpl){
	App.module("LoginApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Login = Marionette.ItemView.extend({
			template: loginTpl,
			className: "login-div",

			triggers: { 
				"click .brand": "landing:show",
				"click .login": "login:show",
				"click .signup": "signup:show"
			},

			events: {
				"click button": "loginClicked"
			},

			loginClicked: function(e){
				console.log("login Button Clicked");

				e.preventDefault();
				this.trigger("login");
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

	return App.LoginApp.Show.View;
});