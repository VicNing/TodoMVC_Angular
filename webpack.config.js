const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/script/app.js',
    output: {
        filename: 'bundle.js',
        path: './dist/script/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    cacheDirectory: './src/cache'
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader", "sass-loader")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    devServer: {
        inline: true
    },
    devtool: "source-map",
    plugins: [
        new ExtractTextPlugin("../css/[name].css")
    ]
};