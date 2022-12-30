const path = require("path");
const HtmlWebpackPlugin =  require("html-webpack-plugin")
const CopyWebpackPlugin =  require("copy-webpack-plugin")
const webpack = require("webpack")
const foldName = "06";
/**
 *  该例子主要演示插件
 */

module.exports = {
    mode: "development",
    entry: {
        path: path.resolve(__dirname, "src", foldName, "index.js")
    },
    output: {
        /**
         * 指定打包的的名字
         */
        filename: "build1.js",
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
        // 默认会生成一个空模板并且根据output中的属性引入静态文件
        // new HtmlWebpackPlugin()  
        // 手动指定模板
        new HtmlWebpackPlugin({
            title: "这是,标题",
            template: "./public/temp/index.html"
        }),

        new webpack.DefinePlugin({
            // 需要加上双引号, 否则就会提示符号错误
            TITLE: '"plugin06"'
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    to: ""
                }
            ]
        })
    ]
}