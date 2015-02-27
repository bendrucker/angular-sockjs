# angular-sockjs [![Build Status](https://travis-ci.org/bendrucker/angular-sockjs.png?branch=master)](https://travis-ci.org/bendrucker/angular-sockjs)
[SockJS](https://github.com/sockjs/sockjs-client) provider for AngularJS.

## Installing

### npm

```sh
$ npm install --save angular-sockjs sockjs-client
````

[sockjs-client](https://www.npmjs.com/package/sockjs-client) is a peer dependency, so you can independently manage the version.

```js
require('angular').module('myApp', [
  require('angular-sockjs')
]);
```

### Bower

```sh
$ bower install angular-sockjs
```

Include a script tag with `angular-sockjs/release/angular-sock.js` before your application. angular-sockjs expects to find the SockJS client as `window.SockJS`.

```js
angular.module('myApp', [
  'sockjs'
]);
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
