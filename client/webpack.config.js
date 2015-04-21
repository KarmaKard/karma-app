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
    filename: '[name].js'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      { test: /\.(svg|png|gif|jpg)$/, loaders: [ 'url?limit=10000', 'img?minimize' ] },
      { test: /\.css$/, loaders: [ 'file?name=[name].css', 'cssnext' ] },
      { test: /\.js$/, loader: 'envify-loader' }
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
  }
}
  
