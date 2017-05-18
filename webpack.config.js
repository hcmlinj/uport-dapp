'use strict'

const webpack = require('webpack')

module.exports = {
    entry: `${__dirname}/src/main`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }, {
                test: /\.s[ac]ss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]' }
            }
        ]
    },
    resolve: {
        alias: {
            '@': `${__dirname}/src`,
            'vue$': 'vue/dist/vue.esm.js',
            'bootstrap': `${__dirname}/node_modules/bootstrap/dist/css/bootstrap.min.css`,
            'bootstrap-theme': `${__dirname}/node_modules/bootstrap/dist/css/bootstrap-theme.min.css`
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}