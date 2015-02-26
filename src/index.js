'use strict';

import angular from 'angular';
import SockJS from 'sockjs-client';
import factory from './factory';

export default angular.module('sockjs', [])
  .value('SockJS', SockJS)
  .factory('socketFactory', factory)
  .name;
