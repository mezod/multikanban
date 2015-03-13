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
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap.min',
  },
  shim: {
  	jqueryui: {
      deps : ["jquery"]
    },
    bootstrap: {
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
  	},
    baseUrl: '/scripts'
  },
  // deps: ['app']
});

require(['app'], function(App) {
  App.start();
});