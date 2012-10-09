/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'plugins/utility'
	],
function(Backbone, Utility) {
	'use strict';

  var Introduction = {};

	Introduction.Model = Backbone.Model.extend({
		defaults: {
			dateandtime: 'Loading Local Date &amp; Time ...',
			ua: '...',
			ip: '0.0.0.0',
			url: '/',
			dob: '1979-09-03',
			breathTime: '...'
		},
		initialize: function() {
      var _this = this;
      this.set({
        'dateandtime':Utility.getDateTime()
      });

      Utility.getIP().done(function(data) {
        _this.set('ip', data.ip);
      });
    }
	});

	Introduction.View = Backbone.View.extend({
		manage: true,
		template: 'introduction',

    serialize: function() {
      return this.model.toJSON();
    }
	});

	return Introduction;
});
