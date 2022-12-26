const path = require("path");
const foldName = "03"

/**
 *  该例子中需要安装, style-loader css-loader url-loader
 *  重点关注url-loader
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
                use: ["ts-loader"]
            },
            {
                // 在css中如果碰到了url属性， 比如设置背景图， 此时会调用require 导致多出default 属性
                test: /\.css$/,
                use: ['style-loader', {
                    loader: "css-loader",
                    options: {
                        // 解决加入 esModule: false 直接返回结果
                        esModule: false
                    }
                }]
            },
            {
                /**
                 *  使用url-loader
                 */
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        // 50k 以内就用base64,反之则使用拷贝
                        limit: 50 * 1024
                    }
                }]
            }
        ]
    }
}