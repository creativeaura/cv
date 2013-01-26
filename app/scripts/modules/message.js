/*global $, jQuery, define, alert, require, window, Backbone,Handlebars */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'app',
  'jquery'
  ],
function(Backbone, App, $) {
	'use strict';

  var Message = {};

  Message.message = $.ajax({
    url: '/send.php'
  });


	Message.View = Backbone.View.extend({
		manage: true,
		template: 'message',

    initialize: function(a, b) {
      if(b){
        //this.collection.once('reset', this.render, this);
      }
    },

    serialize: function() {
      return {};
    }
	});

	return Message;
});
