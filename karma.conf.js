// Karma configuration

module.exports = function (config) {
  config.set({
    basePath: '',
    files: [
      'mock/sockjs-client.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'socket.js',
      '*.spec.js'
    ],

    reporters: ['progress'],

    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],

    captureTimeout: 60000,

    autoWatch: true,
    singleRun: false
  });
};
