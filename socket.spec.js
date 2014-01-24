/*
 * angular-socket-io v0.3.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */

'use strict';


describe('socketFactory', function () {

  beforeEach(module('bd.sockjs'));

  var socket,
      $timeout,
      $browser,
      mockSocket,
      spy;

  beforeEach(inject(function (socketFactory, _$timeout_) {
    $timeout = _$timeout_;
    spy = sinon.spy();
    mockSocket = new SockJS();
    socket = socketFactory({
      socket: mockSocket
    });
  }));


  describe('#setHandler', function () {

    beforeEach(function () {
      this.setHandler = socket.setHandler('open', spy);
    });

    it('sets the handler on the socket instance', function () {
      expect(mockSocket)
        .to.have.property('onopen')
        .that.is.a('function');
    });

    it('wraps the handler to apply asynchronously', function () {
      mockSocket.onopen();
      sinon.assert.notCalled(spy);

      $timeout.flush();
      sinon.assert.called(spy);
    });

    it('is chainable', function () {
      expect(this.setHandler).to.equal(socket);
    });

  });

  describe('#removeHandler', function () {

    beforeEach(function () {
      socket.setHandler('open', spy);
      this.removeHandler = socket.removeHandler('open', spy);
    });

    it('removes the callback from the socket', function () {
      expect(mockSocket)
        .to.not.have
        .property('onopen');
    });

    it('is chainable', function () {
      expect(this.removeHandler).to.equal(socket);
    });

  });


  ['send', 'close'].forEach(function (method) {

    describe('#' + method, function () {

      it('passes through to the socket', function () {
        mockSocket[method] = sinon.spy();
        socket[method]('m');
        sinon.assert.calledWith(mockSocket[method], 'm');
        sinon.assert.calledOn(mockSocket[method], mockSocket);
      });

    });

  });

});
