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

  Message.Model = Backbone.Model.extend({
    defaults: {
      message: 'Please wait...'
    },
    initialize: function() {

    }
  });

  Message.send = function (message) {
    return $.ajax({
      type: 'POST',
      url: 'http://cv.jassal.me/send.php',
      data: 'message=' + message
    });
  };


	Message.View = Backbone.View.extend({
		manage: true,
		template: 'message',
    model: new Message.Model(),

    initialize: function(a, b) {
      var _this = this, mymessage;
      if(b){
        mymessage = Message.send(b);
        this.model.on('change', this.render, this);
        mymessage.done(function(message) {
          _this.model.set('message', message);
        });
      }
    },

    serialize: function() {
      return {message: this.model.toJSON()};
    }
	});

	return Message;
});
