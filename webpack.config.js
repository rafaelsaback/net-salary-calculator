const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'babel-loader',
        options: {
          rootMode: 'upward',
        },
        exclude: /node_modules\/(?!(@nsc)\/).*/,
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()],
};
