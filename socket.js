/*
 * angular-sockjs v0.0.1
 * (c) 2014 Ben Drucker http://bendrucker.me
 * Based on https://github.com/btford/angular-socket-io
 * License: MIT
 */

'use strict';

angular.module('bd.sockjs', [])
  .provider('socketFactory', function () {

    // when forwarding events, prefix the event name
    var ioSocket;

    // expose to provider
    this.$get = function ($timeout) {

      var asyncAngularify = function (socket, callback) {
        return callback ? function () {
          var args = arguments;
          $timeout(function () {
            callback.apply(socket, args);
          }, 0);
        } : angular.noop;
      };

      return function socketFactory (options) {
        options = options || {};
        var socket = options.socket || new SockJS(options.url);

        var wrappedSocket = {
          callbacks: {},
          setHandler: function (event, callback) {
            socket['on' + event] = asyncAngularify(socket, callback);
            return this;
          },
          removeHandler: function(event) {
            delete socket['on' + event];
            return this;
          },
          send: function () {
            return socket.send.apply(socket, arguments);
          },
          close: function () {
            return socket.close.apply(socket, arguments);
          }
        };

        return wrappedSocket;
      };
    };
  });
