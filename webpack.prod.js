const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


// Rules
const htmlRules = {
    test: /\.html$/,
    loader: 'html-loader',
    options:{
        sources: false,
        minimize: false 
    }
}

const cssRules = {
    test: /\.css$/,
    exclude: /style.css$/,
    use: ['style-loader','css-loader']
}

const styleGlobalRules = {
    test: /style.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
}

const fileLoaderRules = {
    test: /\.(png|jpe?g|gif)$/,
    loader: 'file-loader'
}

const javaScriptRules = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options:{
        presets: ['@babel/preset-env']
    }
}

// configure
const htmlWebpackPluginConf = {
    template: 'src/index.html'
}

const miniCssExtractPluginConf = {
    ignoreOrder: false,
    filename: '[name][fullhash].css'
}

const copyWebpackPluginConf = {
    patterns: [
        {from: 'src/assets', to: 'assets'}
    ]
}

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'build'),
        clean: true,
        filename: '[name][fullhash].js'
    },
    module: {
        rules: [
            htmlRules,
            cssRules,
            styleGlobalRules,
            fileLoaderRules,
            javaScriptRules
        ]
    },
    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            htmlWebpackPluginConf
        ),
        new MiniCssExtractPlugin(
            miniCssExtractPluginConf
        ),
        new CopyWebpackPlugin(
            copyWebpackPluginConf
        )
    ],
    devServer: {
        open: true,
        compress: true,
        port: 3000
    }
}