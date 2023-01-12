const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require("webpack");
const {merge} = require("webpack-merge");

// 生成的文件名称有利于我们做浏览器缓存,如果每次都生成新的就没办法使用缓存
const dllConfig = {
    mode: "production",
    entry: {
        "lib": ["react", "react-dom", "jquery"]
    },
    output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name].[contenthash:8].js',
        publicPath: "./",
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        // 开发环境是不需要的, 再下次创建之前,先清空dist目录
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, '[name]-manifest.json'),
            name: '[name]_library',
            context:__dirname
        })
    ]
}

module.exports = dllConfig;