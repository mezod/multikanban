require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    lodash: 'vendor/lodash/dist/lodash',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
    marionette: 'vendor/backbone.marionette/lib/core/backbone.marionette',
    text: 'vendor/requirejs-text/text',
    tpl: 'vendor/requirejs-underscore-tpl/underscore-tpl',
    jqueryui: 'vendor/jquery-ui/jquery-ui.min',
  },
  shim: {
  	jqueryui: {
      deps : ["jquery"]
    },
    underscore: {
  		exports: '_'
  	},
  	backbone: {
  		exports: 'Backbone',
  		deps: ['jquery', 'underscore']
  	},
  	marionette: {
  		exports: 'Marionette',
  		deps: ['backbone']
  	}
  },
  // deps: ['app']
});

require(['app',"apps/menu/menu_app","apps/footer/footer_app"], function(App) {
  App.start();
});