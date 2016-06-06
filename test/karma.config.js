module.exports = function(config) {
  return config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'test/lib/jquery/dist/jquery.min.js',
      'test/lib/angular/angular.min.js',
      'test/lib/angular-mocks/angular-mocks.js',
      'test/lib/angular-validator/dist/angular-validator.js',
      'test/lib/angular-validator/dist/angular-validator-rules.js',
      'dist/angular-form-builder.js',
      'dist/angular-form-builder-components.js',
      'test/specs/*.coffee'
    ],
    preprocessors: {
      '**/*.js': 'uglify'
    },
    exclude: [],
    reporters: ['progress'],
    port: 8081,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 20000,
    singleRun: true,
    reportSlowerThan: 500
  });
};
