define([
	'app',
	"tpl!apps/landing/show/templates/landing.tpl",
], function(App, landingTpl){
	App.module("LandingApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Landing = Marionette.ItemView.extend({
			template: landingTpl,
			className: "landing-div",

			initialize: function(options){
				landingstats = options.landingstats;
			},

			serializeData: function(){

				return {
					numberUsers: landingstats.attributes.numberUsers,
					numberKanbans: landingstats.attributes.numberKanbans,
					numberCompletedTasks: landingstats.attributes.numberCompletedTasks,
					numberTasks: landingstats.attributes.numberTasks
				};
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

	return App.LandingApp.Show.View;
});