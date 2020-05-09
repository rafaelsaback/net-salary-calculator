const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.dev.js',
  },
  devServer: {
    hot: true,
    contentBase: './dist',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
