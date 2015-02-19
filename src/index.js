'use strict';

angular.module('bd.sockjs', [])
  .value('SockJS', require('sockjs-client'))
  .factory('socketFactory', require('./factory'));
