# angular-sockjs [![Build Status](https://travis-ci.org/bendrucker/angular-sockjs.png?branch=master)](https://travis-ci.org/bendrucker/angular-sockjs)
[SockJS](https://github.com/sockjs/sockjs-client) provider for AngularJS.

Based on [Brian Ford's angular-socket-io](https://github.com/btford/angular-socket-io). 


## Install

1. `bower install angular-sockjs`
2. Made sure the [SockJS client library](https://github.com/sockjs/sockjs-client) is loaded.
3. Include the `socket.js` script provided by this component into your app.
4. Add `bd.sockjs` as a module dependency to your app.


## Usage

This module exposes a `socketFactory`, which is an API for instantiating
sockets that are integrated with Angular's digest cycle.


### Making a Socket Instance

```javascript
// in the top-level module of the app
angular.module('myApp', [
  'bd.sockjs',
  'myApp.MyCtrl'
])
.factory('mySocket', function (socketFactory) {
  return socketFactory();
});
```

With that, you can inject your `mySocket` service into controllers and
other serivices within your application!

### Using Your Socket Instance

Building on the example above:

```javascript
// in the top-level module of the app
angular.module('myApp', [
  'bd.sockjs',
  'myApp.MyCtrl'
])
.factory('mySocket', function (socketFactory) {
  return socketFactory({
    url: 'https://example.com'
  });
})
.controller('MyController', function (mySocket) {
  // ...
});
```


## API

Since the SockJS API uses single event handlers rather than Socket.io's event emitter style, this library provides a lightweight wrapper around the handlers.

### `socket.setHandler(event, callback)`
Accepts valid socket events: `open`, [`close`](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent), and [`message`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent). Returns socket wrapper so multiple calls can be chained.

### `socket.removeHandler(event)`
Handles the same events as `socket.setHandler`. Returns socket wrapper so multiple calls can be chained. 

### `socket.send(message)`
Sends a socket message.

### `socket.close([code], [reason])`
Attempts to close the socket.

***

## Options

#### `socketFactory({socket: })`

This option allows you to provide the `socket` service with a `SockJS` instance to be used internally.
This is useful if you need to hold a reference to the `sockjs` object for use elsewhere.

```javascript
angular.module('myApp', [
  'bd.sockjs'
])
.factory('mySocket', function (socketFactory) {
  var sockjs = new SockJS('http://host');

  mySocket = socketFactory({
    socket: sockjs
  });

  return mySocket;
});
```

#### `socketFactory({url: })`

This option allows you to provide a URL to pass through to the SockJS constructor.

## License
MIT
