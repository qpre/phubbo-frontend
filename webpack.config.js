var path = require('path');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var PROD = JSON.parse(process.env.NODE_ENV == 'production' || 'false');

var entry = (function() {
  if (PROD) {
    return ['./src/index'];
  }

  return [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index',
  ];
})();

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV == 'production' || 'true')),
});

var plugins = (function() {
  if (PROD) {
    return [
      definePlugin,
      new ClosureCompilerPlugin({
          compiler: {
            language_in:       'ECMASCRIPT5',
            compilation_level: 'SIMPLE_OPTIMIZATIONS'
          },

          concurrency: 5,
        }),
    ];
  }

  return [
    definePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ];
})();

module.exports = {
  devtool: 'source-map',
  entry: entry,
  output: {
    path:       path.join(__dirname, 'dist'),
    filename:   'bundle.js',
    publicPath: '/',
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel', 'eslint'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: __dirname,
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
};
