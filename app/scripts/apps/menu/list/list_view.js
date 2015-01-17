define([
	'app',
	"tpl!apps/menu/list/templates/list_item.tpl"
], function(App,listItemTpl){
	App.module("MenuApp.List.View", function(View, App, Backbone, Marionette, $, _){

		View.Kanban = Marionette.ItemView.extend({
			tagName: "li",
			template: listItemTpl
		});

		View.Kanbans = Marionette.CollectionView.extend({
			tagName: "ul",
			childView: View.Kanban
		});
	});

	return App.MenuApp.List.View;
});