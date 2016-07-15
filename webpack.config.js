var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: {
        app:['babel-polyfill','./src/index.js'],
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename:"[id].chunk.js",
    },

    devServer: {
        inline: true,
        port: 7070,
        contentBase: __dirname + '/build',
        historyApiFallback: true,
        hot:true,
    },

    module:
    {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ]
    },

    // devtool: "inline-source-map",  // for Debug - remove when publishing
    plugins: [
        /*
         * for production plugins start
         */
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        /*
         * for production plugins end
         */
    ]
};
