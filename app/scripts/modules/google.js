/*global $, jQuery, define, alert, require, window, Backbone,Handlebars */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'app',
  'jquery'
  ],
function(Backbone, App, $) {
	'use strict';

  var Google = {};

  Google.endpoint = 'http://ajax.googleapis.com/ajax/services/search/web?callback=?&v=1.0&rsz=5&start=0';

   Google.Model = Backbone.Model.extend({
    defaults: {
      content: '',
      title: '',
      titleNoFormatting: '',
      url: '',
      visibleUrl: '',
      unescapedUrl: '',
      cacheUrl: ''
    },
    initialize: function() {

    }
  });

  Google.Collection = Backbone.Collection.extend({
    model: Google.Model,
    //url: Google.endpoint,

    parse: function(response) {
      return response.responseData.results;
    },
    setKeyword: function(k) {
      var _this = this;
      var urlString = Google.endpoint + '&q=' + k;
      this.reset();
      this.url = urlString;
      this.fetch();
    }
  });

  Google.Results = new Google.Collection();
  
	Google.View = Backbone.View.extend({
		manage: true,
		template: 'google',
    collection: Google.Results,

    initialize: function(a, b) {
      if(b){
        Google.Results.setKeyword(b);
        this.collection.once('reset', this.render, this);
      }
    },

    serialize: function() {
      return {results: this.collection.toJSON()};
    }
	});

	return Google;
});