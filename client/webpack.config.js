require('dotenv').load()
var webpack = require('webpack')

module.exports = {
  entry: {
    main: [
      'babel/polyfill',
      './app/main.js',
    ]
  },
  output: {
    path: './dist',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      { test: /\.(svg|png|gif|jpg)$/, loaders: [ 'url?limit=10000', 'img?minimize' ] },
      { test: /\.css$/, loaders: [ 'file?name=[name].css', 'cssnext' ] },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel?stage=0' },
    ]
  },
  cssnext: {
    browsers: [ 'last 2 versions' ],
    compress: true,
    // until cssnext handles loaders properly: https://github.com/cssnext/cssnext-loader/issues/4
    url: {
      // note: doesn't handle absolute urls
      maxSize: 10, // kb
      url: 'inline'
    }
  },
  devServer: {
    contentBase: 'dist/',
    host: 'localhost',
    inline: true
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV", "API_HOST"
    ])
  ]
}
  
