/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone'
	],
function(Backbone) {
	'use strict';

  var Pages = {};

	Pages.View = Backbone.View.extend({
		manage: true,
		template: 'about',

    initialize: function(options) {
      this.template = options.template;
    },

    serialize: function() {

    },
    beforeRender: function() {

    }
	});

	return Pages;
});
