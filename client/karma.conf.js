var webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'node_modules/babel-core/browser-polyfill.js',
      'test/**/*.spec.js',
      {pattern: 'assets/img/**/*', watched: false, included: false, served: true}
    ],
    exclude: [],
    webpack: {
      cache: true,
      debug: true,
      module: {
        loaders: webpackConfig.module.loaders.concat([
          { test: /sinon/, loader: 'imports?define=>false' }
        ])
      },
      cssnext: webpackConfig.cssnext
    },
    webpackServer: {
      quiet: true,
      stats: {
        colors: true
      }
    },
    preprocessors: {
      'test/**/*.spec.js': [ 'webpack', 'sourcemap' ]
    },
    proxies: {
      '/img/': '/base/assets/img/'
    },
    reporters: [ 'dots' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: ['Firefox'],
    captureTimeout: 120000,
    browserNoActivityTimeout: 120000,
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-safari-launcher'),
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
      require('karma-webpack')
    ]
  })
}
