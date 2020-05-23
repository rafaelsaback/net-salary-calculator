const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const webpackConfig = require('../../webpack.config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.resolve.alias['@assets'] = path.resolve(__dirname, 'assets');
  config.module.rules = [...config.module.rules, ...webpackConfig.module.rules];

  return config;
};
