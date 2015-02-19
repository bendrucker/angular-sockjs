'use strict';

module.exports = angular.module('sockjs', [])
  .value('SockJS', require('sockjs-client'))
  .factory('socketFactory', require('./factory'))
  .name;
