//'use strict';

var path = require('path');
var publicPath = path.resolve(__dirname, 'public');

var config = {
    entry: ['./client/app.js'],
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    publicPath: publicPath,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

module.exports = config;