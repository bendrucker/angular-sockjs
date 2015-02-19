'use strict';

var angular = require('angular');

exports = module.exports = function (SockJS, $rootScope) {
  return function socketFactory (options) {
    options = options || {};
    var socket = options.socket || new SockJS(options.url);
    
    return {
      setHandler: function (event, callback) {
        socket['on' + event] = $applyAsync(socket, callback);
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
  };

  function $applyAsync (socket, callback) {
    if (!callback) return angular.noop;
    return function $socketHandler () {
      var args = arguments;
      $rootScope.$applyAsync(function $triggerSocketCallback () {
        callback.apply(socket, args);
      });
    };
  }
};
exports.$inject = ['SockJS', '$rootScope'];
