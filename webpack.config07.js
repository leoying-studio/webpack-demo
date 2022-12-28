const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const foldName = "07"

/**
 *  该例子中需要安装, babel-loader  
 *  yarn add babel-loader  
 *  并且通过babel.config.js 进行配置
 */

module.exports = {
    entry: {
        path: path.resolve(__dirname, "src", foldName, "index.js")
    },
    output: {
        /**
         * 指定打包的的名字
         */
        filename: "build.js",
        path: path.resolve(__dirname, "dist", foldName),
        publicPath: "./"
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