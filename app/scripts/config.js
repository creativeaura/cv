/*global $, window, CanvasLoader, jQuery, alert, require */
/*jslint browser:true, devel:true, unused:false */

// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file.
  deps: ['main', 'command', 'introduction', 'input', 'google', 'pages', 'utility', 'countdown', 'calc'],

  paths: {
    // JavaScript folders.
    libs: '../scripts/libs',
    plugins: '../scripts/plugins',

    // Libraries.
    jquery: '../scripts/libs/jquery',
    lodash: '../scripts/libs/lodash',
    backbone: '../scripts/libs/backbone',
    handlebars: '../scripts/libs/handlebars',
    //layoutmanager: '../scripts/plugins/backbone.layoutmanager',
    command: '../scripts/modules/command',
    introduction: '../scripts/modules/introduction',
    input: '../scripts/modules/input',
    google: '../scripts/modules/google',
    pages: '../scripts/modules/pages',
    calc: '../scripts/modules/calc',
    utility: '../scripts/plugins/utility',
    countdown: '../scripts/plugins/countdown'
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    },
    // Backbone.LayoutManager depends on Backbone.
    'plugins/backbone.layoutmanager': ['backbone', 'handlebars']
  }

});
