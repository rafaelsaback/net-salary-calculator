pathLib = require("path");

module.exports = {
  mode: 'production',
  entry: './components/typescript/Controller.ts',
  output: {
    filename: 'script.js',
    path: pathLib.join(__dirname, 'build')
  },
    devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
};
