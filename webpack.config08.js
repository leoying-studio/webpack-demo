const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const foldName = "08"

/**
 *  该例子中需要安装, babel-loader  
 *  yarn add babel-loader  
 *  并且通过babel.config.js 进行配置
 */

module.exports = {
    mode: "development",
    entry: {
        path: path.resolve(__dirname, "src", foldName, "index.js")
    },
    devServer: {
        client: {
            progress: true,
          },
    },
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