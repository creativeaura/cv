/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'app',
  'jquery'
  ],
function(Backbone, App, $) {
	'use strict';

  var Google = {};

  Google.endpoint = 'http://ajax.googleapis.com/ajax/services/search/web?callback=?';


  Google.CustomSearch = function () {
    this.results = [];
    this.keyword = '';
  };

  Google.CustomSearch.prototype.find = function(keyword) {
    this.keyword = keyword;
    return $.getJSON(Google.endpoint, {
      v: '1.0',
      q: 'gaurav+jassal',
      rsz: 8,
      start: 0
    });
  };

  Google.Results = new Google.CustomSearch();

	Google.View = Backbone.View.extend({
		manage: true,
		template: 'google',

    initialize: function() {

    },

    serialize: function() {
      Google.Results.find('sample').done(function(data) {
        console.log(data.responseData.results);
        return {results: data.responseData.results};
      });
      //return {help: Google.Results.find('sample')};
    }
	});

	return Google;
});
