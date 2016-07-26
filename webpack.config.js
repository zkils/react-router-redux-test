var path = require('path');
var webpack = require('webpack');

var env = true;
var GLOBAL_VARIABLES = {
    'process.env.NODE_ENV':JSON.stringify((env) ? 'development' : 'production' ),
    'process.env.LANGUAGE':JSON.stringify('kor'),
    __DEV__: env
}

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
            {test: /\.css$/, loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'},
            {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
            {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
            {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
        ]
    },

    devtool: "inline-source-map",  // for Debug - remove when publishing
    plugins: [
        /*
         * for production plugins start
         */
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.DefinePlugin(GLOBAL_VARIABLES),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production'),
        //         //'LANGUAGE': JSON.stringify('kor'),
        //     },
        // }),
        /*
         * for production plugins end
         */
    ]
};
