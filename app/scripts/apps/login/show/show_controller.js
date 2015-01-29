define([
	'app',
	'apps/login/show/show_view'
], function(App, View){
	App.module("LoginApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showLogin: function(){

				var loginShowView = new View.Login();

				loginShowView.on("login", function(){

					console.log("login");
					//login logic

					var url = '../../multikanban-api/web/tokens';
					var formValues = {
			            username: $('#inputUsername').val(),
			            password: $('#inputPassword').val()
			        };

			        $.ajax({
			            url:url,
			            type:'GET',
			            dataType:"json",
			            //data: formValues,
			            headers: { 'PHP_AUTH_USER' : formValues.username, 'PHP_AUTH_PW' : formValues.password },
			            success:function (data) {
			                console.log(["Login request details: ", data]);
			               
			                if(data.error) {  // If there is an error, show the error messages
			                    console.log('error logging in');
			                }
			                else { // If not, send them back to the home page
			                    App.trigger("home:show");
			                }
			            }
			        });

					//App.loggedIn = true;
					
				});

				App.contentRegion.show(loginShowView);
			}
		}
	});

	return App.LoginApp.Show.Controller;
});