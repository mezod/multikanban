define([
	'app',
	"tpl!apps/home/show/templates/list.tpl",
	"tpl!apps/home/show/templates/list_item.tpl"
], function(App, listTpl, listItemTpl){
	App.module("HomeApp.Show.View", function(View, App, Backbone, Marionette, $, _){

		View.Home = Marionette.ItemView.extend({
			tagName: "li",
			template: listItemTpl
		});

		View.Homes = Marionette.CompositeView.extend({
			template: listTpl,
			childView: View.Home,
			childViewContainer: 'ul'
		});
	});

	return App.HomeApp.Show.View;
});