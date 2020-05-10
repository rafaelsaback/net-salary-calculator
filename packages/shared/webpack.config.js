const merge = require('webpack-merge');
const webpackConfig = require('../../webpack.config');

module.exports = merge(webpackConfig, {
  entry: './src/index.ts',
});
