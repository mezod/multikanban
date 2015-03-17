define([
	'app',
	"tpl!apps/home/show/templates/list.tpl",
	"tpl!apps/home/show/templates/list_item.tpl"
], function(App, listTpl, listItemTpl){
	App.module("HomeApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Home = Marionette.ItemView.extend({
			tagName: "li",
			className: "activity-item",
			template: listItemTpl,

			// initialize: function(options){
			// 	completedtask = options;
			// 	console.log(options);
			// },

			serializeData: function(){

				return {
					dateCompleted: this.model.attributes.dateCompleted,
					text: this.model.attributes.text
				};
			}
		});

		View.Homes = Marionette.CompositeView.extend({
			template: listTpl,
			childView: View.Home,
			childViewContainer: 'ul',

			initialize: function(options){
				stats = options.stats;
				console.log(stats.attributes.numberKanbans);
			},

			serializeData: function(){

				return {
					numberKanbans: stats.attributes.numberKanbans,
					numberCompletedTasks: stats.attributes.numberCompletedTasks,
					numberTasks: stats.attributes.numberTasks
				};
			}


		});
	});

	return App.HomeApp.Show.View;
});