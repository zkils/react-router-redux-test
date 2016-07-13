var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app:['./src/index.js'],
        vendor:['react','react-dom','redux','react-router','react-router-redux'],
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].chunk.js',
        chunkFilename:"[name]_[chunkhash:20].js",
    },

    devServer: {
        inline: true,
        port: 7070,
        contentBase: __dirname + '/build',
        historyApiFallback: true,
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

    resolve: {
        alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
    },
    plugins: [
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
        new webpack.optimize.CommonsChunkPlugin('vendor','./lib/vendor.js',Infinity),
    ]
};
