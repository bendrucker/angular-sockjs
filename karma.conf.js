// Karma configuration

module.exports = function (config) {
  config.set({
    files: [
      './components/angular/angular.js',
      './components/angular-mocks/angular-mocks.js',
      './test/*.js',
      './src/index.js'
    ],

    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'sinon'],

    autoWatch: true
  });
};
