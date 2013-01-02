/*global $, jQuery, define, alert, require, window, Backbone, _ */
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
      params: '',
      hash: ''
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
        
        var originalCommand = _.clone(command),
        cmd = this.isValid(command),
        module, params, action, hash;

        if (cmd.length === 1) {
          // Command Found
          cmd = cmd[0];
          App.trigger('render-command', command, cmd);
          module = cmd.get('module').toLowerCase();
          params = cmd.get('params');
          action = cmd.get('action');
          hash   = this.getArgs(originalCommand.c);
          cmd.set('hash', hash);
          require(['modules/' + module], function(Klass) {
            if(action === 'View') {
              App.layout.insertView('#output', new Klass[action](params, hash)).render();
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
        var commandParams;
        return Command.CommandCollection.filter(function(data) {
          commandParams = command.c.match(/\b[a-z]+\b/gi);
          command.c = commandParams[0];
          commandParams.splice(0,1);
          command.p = commandParams.join(' ');
          return data.get('command') === command.c || (data.get('alias').indexOf(command.c) >= 1);
        });
      },

      getArgs: function(comm) {
        var commandArgs;
        if (comm) {
          commandArgs = comm.match(/\b[a-z]+\b/gi);
          commandArgs.splice(0, 1);
          return commandArgs.join(' ');
        }
      },
      clear: function() {
        $('#output').empty();
      }
    };
  }());

	return Command;
});
