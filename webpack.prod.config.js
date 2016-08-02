/**
 * Created by krinjadl on 2016-08-01.
 */
var path = require('path');
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var environment = require('./src/config/config.js');

var GLOBAL_VARIABLES = {
    'process.env.NODE_ENV':JSON.stringify('production'),
    'process.env.WIDGET':JSON.stringify((environment.appMode) ? 'app' : 'widget'),
    __DEV__: false
}

module.exports = {
    entry: {
        app:['whatwg-fetch','babel-polyfill','./src/index.js'],
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename:"[id].chunk.js",
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
            {test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin(GLOBAL_VARIABLES),
        //new webpack.optimize.CommonsChunkPlugin('common.js'),
        //new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
        }),
        new webpack.optimize.DedupePlugin(),
    ]
};
