/*global define, $, window, CanvasLoader, jQuery, alert, require, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
  // Application.
  'app',

  // Required Modules
  'modules/introduction',
  'modules/input',
  'modules/help',
  'modules/pages'
],

function(app, Introduction, Input, Help, Pages) {
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

      app.on('command', function(command) {
        layout.insertView('#output', new Introduction.ViewHistory({ model:command} )).render();

        if (command.c === 'help' || command.c === 'h') {
          Help.HelpCollection.fetch().done(function() {
            layout.insertView('#output', new Help.View()).render();
          });
        } else if(command.c === 'about' || command.c === 'abt') {
          layout.insertView('#output', new Pages.View({template: 'about'})).render();
        }
      });
    }

  });

  return Router;

});
