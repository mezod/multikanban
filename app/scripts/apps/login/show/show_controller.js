define([
	'app',
	'apps/login/show/show_view'
], function(App, View){
	App.module("LoginApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showLogin: function(){

				var loginShowView = new View.Login();

				loginShowView.on("landing:show", function(){

					App.trigger("landing:show");
				});

				loginShowView.on("login:show", function(){

					App.trigger("login:show");
				});

				loginShowView.on("signup:show", function(){

					App.trigger("signup:show");
				});

				loginShowView.on("login", function(){

					console.log("login");
					//login logic

					var url = '/multikanban-api/web/tokens';
					var formValues = {
			            username: $('#inputUsername').val(),
			            password: $('#inputPassword').val()
			        };

			        $.ajax({
			            url:url,
			            type:'GET',
			            dataType:"json",
			            contentType: "application/json",
			            //data: formValues,
			            headers: { 'PHP_AUTH_USER' : formValues.username, 'PHP_AUTH_PW' : formValues.password },
			            success:function (data) {
			                console.log(["Login request details: ", data]);
			               
			                if(data.error) {  // If there is an error, show the error messages
			                    console.log('error data');
			                }
			                else { // If not, send them to the home page
			                	console.log(data);

			                	// Saving the user in the localStorage
			                	window.localStorage.setItem('multikanban user', JSON.stringify(data));
			                	App.loggedInUser = data;
			                    App.trigger("home:show");
			                }
			            },
			            error:function(data){
			            	$('#login-error').append('<li>Invalid username or password.</li>');
			            },
			            statusCode: {
			            	401: function(){
			            		console.log('401 invalid credentials');
			            	}
			            }
			        });

			
					
				});

				App.contentRegion.show(loginShowView);
			}
		}
	});

	return App.LoginApp.Show.Controller;
});