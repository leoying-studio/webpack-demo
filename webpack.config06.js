const path = require("path");
const HtmlWebpackPlugin =  require("html-webpack-plugin")
const foldName = "06"

/**
 *  该例子主要演示插件
 */

module.exports = {
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
            title: "这是标题",
            template: "./public/temp/index.html"
        })
    ]
}