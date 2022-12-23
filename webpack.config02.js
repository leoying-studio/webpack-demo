const path = require("path");
const foldName = "02"

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
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
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