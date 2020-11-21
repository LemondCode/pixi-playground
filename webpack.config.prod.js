const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist'),
    },
    //optimization: {
    //    minimizer: [new UglifyJSPlugin({
    //        uglifyOptions: {
    //            output: {
    //                comments: false //use it for removing comments like "/*! ... */"
    //            }
    //        }
    //    })]
    //},
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve('./src/assets'), to: './assets' },
            ]
        }),
        new HTMLWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            hash: true,
            minify: false
        })
    ]
}