/*global $, jQuery, define, alert, require, window, Backbone */
/*jslint browser:true, devel:true, unused:false */

define(['backbone', 'app'], function(Backbone, App) {
  'use strict';

  var Input = {};

  Input.View = Backbone.View.extend({
    manage: true,
    template: 'input',
    events: {
      'keydown #inputfield': 'action',
      'blur #inputfield': 'setFocus'
    },

    initialize: function() {
      this.prompt = '[gaurav$bash]';
      this.commandHistory = [];
      this.commandPointer = 0;
    },

    serialize: function() {
      return {
        prompt: this.prompt
      };
    },

    action: function(event) {
      var command;
      if(event.which === 13) {
        command = this.$input.val();
        this.$input.val('');
        App.trigger('command', {
          p: this.prompt,
          'c': command
        });
        this.commandHistory.push(command);
        this.commandPointer = this.commandHistory.length;
      } else if(event.which === 38) {
        if(this.commandPointer > 0) {
          this.$input.val(this.commandHistory[this.commandPointer - 1]);
          this.commandPointer--;
        }
      } else if(event.which === 40) {
        if(this.commandPointer < this.commandHistory.length) {
          this.$input.val(this.commandHistory[this.commandPointer - 1]);
          this.commandPointer++;
        }
      }
    },
    afterRender: function() {
      this.$input = this.$('input#inputfield');
      this.$input.focus();
    },
    setFocus: function() {
      this.$input.focus();
    }
  });

  return Input;
});
