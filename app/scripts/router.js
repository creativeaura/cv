/*global define, $, window, CanvasLoader, jQuery, alert, require, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
  // Application.
  'app'
],

function(app) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      app.useLayout('layout');
    }
  });

  return Router;

});
