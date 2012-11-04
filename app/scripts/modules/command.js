/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'app',
  'modules/introduction'
	],
function(Backbone, App, Introduction) {
	'use strict';

  var Command = {};

  Command.Model = Backbone.Model.extend({
    defaults: {
      command: '',
      alias: '',
      parameters: '',
      description: '',
      module: '',
      action: '',
      params: ''
    },
    initialize: function() {

    }
  });

  Command.Collection = Backbone.Collection.extend({
    model: Command.Model,
    url: '/data/commands.json',

    parse: function(response) {
      return response.help;
    }
  });

  Command.CommandCollection = new Command.Collection();

	Command.View = Backbone.View.extend({
		manage: true,
		template: 'help',
    collection: Command.CommandCollection,

    initialize: function() {
      this.collection.on('change', this.render, this);
    },

    serialize: function() {
      return {help: this.collection.toJSON()};
    }
	});

  Command.Controller = (function() {
    return {
      run: function(command) {
        var cmd = this.isValid(command),
        module, params, action;

        if (cmd.length === 1) {
          // Command Found
          cmd = cmd[0];
          App.trigger('render-command', command, cmd);
          
          module = cmd.get('module').toLowerCase();
          params = cmd.get('params');
          action = cmd.get('action');

          require(['modules/' + module], function(Klass) {
            if(action === 'View') {
              App.layout.insertView('#output', new Klass[action](params)).render();
            } else {
              Klass.Controller[action]();
            }
          });

          App.router.navigate('/#' + command.c, {trigger: false});

        } else {
          // Command Not Found
          App.trigger('command-notfound', command);
          command.errorMessage = 'Command not found';
          App.layout.insertView('#output', new Introduction.ViewHistory({ model: command} )).render();
        }
      },
      isValid: function(command) {
        return Command.CommandCollection.filter(function(data) {
          console.log(data.get('alias').indexOf(command.c));
          return data.get('command') === command.c || (data.get('alias').indexOf(command.c) >= 1);
        });
      },
      clear: function() {
        $('#output').empty();
      }
    };
  }());

	return Command;
});
