/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone'
	],
function(Backbone) {
	'use strict';

  var Help = {};

  Help.Model = Backbone.Model.extend({
    defaults: {
      command: '',
      alias: '',
      parameters: '',
      description: ''
    },
    initialize: function() {

    }
  });

  Help.Collection = Backbone.Collection.extend({
    model: Help.Model,
    url: '/data/help.json',

    parse: function(response) {
      return response.help;
    }
  });

  Help.HelpCollection = new Help.Collection();

	Help.View = Backbone.View.extend({
		manage: true,
		template: 'help',
    collection: Help.HelpCollection,

    initialize: function() {
      this.collection.on('change', this.render, this);
    },

    serialize: function() {
      return {help: this.collection.toJSON()};
    }
	});

	return Help;
});
