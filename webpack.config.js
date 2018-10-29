path = require("path");

module.exports = {
    mode: 'production',
    entry: ['./src/scripts/Controller.ts', './src/styles/main.scss'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: "source-map",
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};
