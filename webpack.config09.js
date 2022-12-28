const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const foldName = "09";

//** 该例子主要为了演示HMR, 局部刷新,而不是全部刷新 */

module.exports = {
    mode: "development",
    entry: {
        path: path.resolve(__dirname, "src", foldName, "index.js")
    },
    devServer: {
        client: {
            // progress: true,
        },
        hot: true
    },
    target: "web",
    output: {
        /**
         * 指定打包的的名字
         */
        filename: "build.js",
        path: path.resolve(__dirname, "dist", foldName),
        // 在使用devServer的模式下, 这里不能使用相对路径, 应该使用根路径, 否则会出现找不到对应目录的情况
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}