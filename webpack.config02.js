const path = require("path");
const foldName = "02"

/**
 *  该例子中需要安装, style-loader css-loader file-loader 
 */

module.exports = {
    entry: {
        path: path.resolve(__dirname, "src", foldName , "index.js")
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
        rules: [{
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
             *  file-load 本质上是对源文件进行的一个拷贝
             */
            test: /\.(png|jpg|gif)/,
            use: [{
                loader: "file-loader",
                options: {
                    // 设置了esModule 为false 默认不会通过esModule的方式来导入
                    esModule: false
                }
            }]
        }
        ]
    }
}