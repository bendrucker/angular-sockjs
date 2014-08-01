'use strict';

angular.module('bd.sockjs', [])
  .value('SockJS', window.SockJS)
  .provider('socketFactory', function () {

    // expose to provider
    this.$get = function (SockJS, $timeout) {

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

    this.$get.$inject = ['SockJS', '$timeout'];

  });
