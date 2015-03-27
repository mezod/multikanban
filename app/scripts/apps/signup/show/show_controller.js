define([
	'app',
	'apps/signup/show/show_view'
], function(App, View){
	App.module("SignupApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Controller = {
			showSignup: function(){

				var signupShowView = new View.Signup();

				signupShowView.on("landing:show", function(){

					App.trigger("landing:show");
				});

				signupShowView.on("login:show", function(){

					App.trigger("login:show");
				});

				signupShowView.on("signup:show", function(){

					App.trigger("signup:show");
				});

				signupShowView.on("signup", function(){

					console.log("signup");
					//signup logic

					var url = '/multikanban-api/web/users';
					var formValues = {
			            username: $('#inputUsername').val(),
			            password: $('#inputPassword').val(),
			            email: $('#inputEmail').val()
			        };

			        $.ajax({
			            url:url,
			            type:'POST',
			            dataType:"json",
			            contentType: "application/json",
			            data: JSON.stringify(formValues),
			            success:function (data) {
			               
			                if(data.error) {  // If there is an error, show the error messages
			                    console.log('error data');
			                }
			                else { // If not, send them to the home page

			                	// Saving the user in the localStorage
			                	window.localStorage.setItem('multikanban user', JSON.stringify(data));
			                	App.loggedInUser = data;
			                	
			                    App.trigger("home:show");
			                }
			            },
			            error:function(data){
			            	if(data.responseJSON.errors){

			            		for (var key in data.responseJSON.errors){
			            			$('#signup-error').append('<li>'+ data.responseJSON.errors[key] +'</li>');
			            		}
			
			            	}else if(data.responseJSON.status == '409' ){
			            		$('#signup-error').append('<li>This account already exists</li>');
			            	}	
			            }
			        });
					
				});

				App.contentRegion.show(signupShowView);
			}
		}
	});

	return App.SignupApp.Show.Controller;
});