/*global define, $, window, CanvasLoader, jQuery, alert, require, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
  // Application.
  'app',

  // Required Modules
  'introduction',
  'input',
  'command'
],

function(app, Introduction, Input, Command) {
  'use strict';

  // Load command list for all actions

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      ':page': 'page'
    },

    intro: function() {
      this.layout = app.useLayout('layout');
      this.layout.setView('.introduction', new Introduction.View({model: new Introduction.Model()}));
      this.layout.setView('#input', new Input.View());

      this.layout.render();
    },

    index: function() {
      this.intro();
      this.commandListener();
    },

    page: function(page, params) {
      this.intro();
      this.layout.insertView('#output', new Introduction.ViewHistory({ model:{c: page, p: '[gaurav$bash] ~ '}} )).render();
      Command.Controller.run({c: page, cp: params});
      this.commandListener();
    },

    commandListener: function() {
      var _this = this;
      app.on('command', function(command) {
        _this.layout.insertView('#output', new Introduction.ViewHistory({ model:command} )).render();
        Command.Controller.run(command);
        $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
      });
    }

  });

  return Router;

});
