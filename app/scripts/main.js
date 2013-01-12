/*global $, jQuery, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

require([
// Application.
'app',

// Main Router.
'router',
'command'
],

function (app, Router, Command) {
  'use strict';

  Command.CommandCollection.fetch().done(function() {
    app.router = new Router();

    Backbone.history.start({
      pushState: true,
      root: app.root
    });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on('click', 'a:not([data-bypass])', function (evt) {

    // Get the absolute anchor href.
    var href = $(this).attr('href');

    // If the href exists and is a hash route, run it through Backbone.
    if (href && href.indexOf('#') === 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href, true);
    }
  });

  $(window).on('click', function () {
    //evt.preventDefault();
    $('#inputfield').val($('#inputfield').val());
  });


});
