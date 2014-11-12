require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter.js',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr.js',
    'backbone.marionette': 'vendor/backbone.marionette/lib/core/backbone.marionette.js',
  },
  shim: {
	underscore: {
		exports: '_'
	},
	backbone: {
		exports: 'Backbone',
		deps: ['jquery', 'underscore']
	},
	marionette: {
		exports: 'Backbone.Marionette',
		deps: ['backbone']
	}
  },
  deps: ['jquery', 'underscore']
});

require(['views/app'], function(AppView) {
  new AppView;
});