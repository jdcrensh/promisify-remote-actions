var webpack = require('webpack');
var path = require('path');
var libraryName = require('./package.json').name;
var entry = path.join(__dirname, 'src', 'index.js');

var config = {
  entry: {
    [libraryName]: entry,
    [libraryName + '.min']: entry,
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      warnings: false,
      comments: false,
      sourceMap: true,
    }),
  ],
};

module.exports = config;
