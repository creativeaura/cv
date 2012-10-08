/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone'
	],
function(Backbone) {
	'use strict';
	var Introduction = Backbone.View.extend({
		manage: true
	});

	return Introduction;
});