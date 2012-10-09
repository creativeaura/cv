/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define([
	],
function() {
	'use strict';

  var Utility = {
		getDateTime: function() {
      var currentTime = new Date(),
        currentHours = currentTime.getHours(),
        currentMinutes = currentTime.getMinutes(),
        currentSeconds = currentTime.getSeconds(),
        currentDate = currentTime.getDate(),
        currentMonth = currentTime.getMonth(),
        currentYear = currentTime.getFullYear(),
        timeOfDay, currentTimeString,
        monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

      currentMinutes = ( currentMinutes < 10 ? '0' : '' ) + currentMinutes;
      currentSeconds = ( currentSeconds < 10 ? '0' : '' ) + currentSeconds;

      timeOfDay = ( currentHours < 12 ) ? 'AM' : 'PM';
      currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
      currentHours = ( currentHours === 0 ) ? 12 : currentHours;
      currentTimeString = currentHours + ':' + currentMinutes + ':' + currentSeconds + ' ' + timeOfDay;

      currentTimeString = monthNames[currentMonth-1] + ' ' + currentDate + ' ' + currentYear + ' ' + currentTimeString;
      return currentTimeString;
    },
    getIP: function() {
			return $.ajax({
				url: 'http://api.hostip.info/get_json.php',
				async: false,
				dateType: 'JSON'
			});
    }
  };

	return Utility;
});
