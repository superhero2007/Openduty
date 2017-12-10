const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      img: path.resolve(__dirname, 'public/img'),
      actions: path.resolve(__dirname, 'src/actions'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      sagas: path.resolve(__dirname, 'src/sagas'),
      containers: path.resolve(__dirname, 'src/components/containers'),
      layout: path.resolve(__dirname, 'src/components/layout'),
      forms: path.resolve(__dirname, 'src/components/forms'),
      partials: path.resolve(__dirname, 'src/components/partials'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-decorators-legacy', 'transform-runtime'],
          presets: ['es2017', 'stage-1', 'react'],
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    // new MinifyPlugin(),
  ],
  devtool: 'source-map',
};
