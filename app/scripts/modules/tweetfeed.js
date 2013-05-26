/*global $, jQuery, define, alert, require, window, Backbone,Handlebars */
/*jslint browser:true, devel:true, unused:false */

define([
	'backbone',
  'app',
  'jquery'
  ],
function(Backbone, App, $) {
	'use strict';

  var tweetfeed = {};

  tweetfeed.endpoint = 'https://api.twitter.com/1/statuses/user_timeline.json?callback=?&include_entities=true&include_rts=true&count=5';

   tweetfeed.Model = Backbone.Model.extend({
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

  tweetfeed.Collection = Backbone.Collection.extend({
    model: tweetfeed.Model,
    //url: Google.endpoint,

    parse: function(response) {
      return response;
    },
    setKeyword: function(k) {
      var _this = this;
      var urlString = tweetfeed.endpoint + '&screen_name=' + k;
      this.reset();
      this.url = urlString;
      this.fetch();
    }
  });

  tweetfeed.Results = new tweetfeed.Collection();

	tweetfeed.View = Backbone.View.extend({
		manage: true,
		template: 'tweetfeed',
    collection: tweetfeed.Results,

    initialize: function(a, b) {
      if(b){
        tweetfeed.Results.setKeyword(b);
        this.collection.once('reset', this.render, this);
      }
    },

    serialize: function() {
      return {results: this.collection.toJSON()};
    }
	});

	return tweetfeed;
});