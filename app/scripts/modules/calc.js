/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone'
	],
function(Backbone) {
	'use strict';

  var Calc = {};

	Calc.View = Backbone.View.extend({
		manage: true,
		template: 'calc',

    initialize: function(options, equation) {
      this.equation = equation;
    },

    serialize: function() {
      return {results: eval(this.equation)};
    },
    beforeRender: function() {

    }
	});

	return Calc;
});
