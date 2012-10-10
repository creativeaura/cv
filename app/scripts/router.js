/*global define, $, window, CanvasLoader, jQuery, alert, require, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
  // Application.
  'app',
  'modules/introduction',
  'modules/input'
],

function(app, Introduction, Input) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'index'
    },

    index: function() {
      var layout = app.useLayout('layout');
      layout.setView('.introduction', new Introduction.View({model: new Introduction.Model()}));
      layout.setView('#input', new Input.View());
      layout.render();

      app.on('command', function(c) {

      });
    }
  });

  return Router;

});
