'use strict';

var proxyquire = require('proxyquireify')(require);
var sinon      = require('sinon');
var expect     = require('chai').expect;

describe('socketFactory', function () {

  var socket, socketFactory, $timeout, SockJS, sockJS, spy;
  beforeEach(angular.mock.module(proxyquire('../', {
    'sockjs-client': sinon.spy()
  })));
  beforeEach(angular.mock.inject(function (_socketFactory_, _$timeout_, _SockJS_) {
    socketFactory = _socketFactory_;
    $timeout = _$timeout_;
    SockJS = _SockJS_;
    spy = sinon.spy();
    sockJS = new SockJS();
    socket = socketFactory({
      socket: sockJS
    });
    SockJS.reset();
  }));

  describe('Factory', function () {

    it('can create a socket by URL', function () {
      socketFactory({
        url: 'url'
      });
      sinon.assert.calledWith(SockJS, 'url');
      sinon.assert.calledWithNew(SockJS);
    });

  });

  describe('#setHandler', function () {

    var setHandler;
    beforeEach(function () {
      setHandler = socket.setHandler('open', spy);
    });

    it('sets the handler on the socket instance', function () {
      expect(sockJS).to.respondTo('onopen');
    });

    it('wraps the handler to apply asynchronously', function () {
      sockJS.onopen();
      sinon.assert.notCalled(spy);
      $timeout.flush();
      sinon.assert.called(spy);
    });

    it('is chainable', function () {
      expect(setHandler).to.equal(socket);
    });

  });

  describe('#removeHandler', function () {

    var removeHandler;
    beforeEach(function () {
      socket.setHandler('open', spy);
      removeHandler = socket.removeHandler('open', spy);
    });

    it('removes the callback from the socket', function () {
      expect(sockJS).to.not.respondTo('onopen');
    });

    it('is chainable', function () {
      expect(removeHandler).to.equal(socket);
    });

  });


  ['send', 'close'].forEach(function (method) {

    describe('#' + method, function () {

      it('passes through to the socket', function () {
        sockJS[method] = sinon.spy();
        socket[method]('m');
        sinon.assert.calledWith(sockJS[method], 'm');
        sinon.assert.calledOn(sockJS[method], sockJS);
      });

    });

  });

});
