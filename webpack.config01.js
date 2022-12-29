const path = require("path");

/**
 *  该例子中需要安装file-loader 
 */

/**
 *  该配置文件默认是在项目的根目录下面的， 当执行命令的时候在根目录下面才会应用, 如果需要改动名称和位置则可以通过
 *  package.json 中的新增 --config 来设置自定义文件名称  build: "webpack --config webpack.config01.js
 *  以上是最常规的基础配置， 匹配了css 和 图片
 */
module.exports = {
    entry: {
        path: path.resolve(__dirname, "src", "01", "index.js")
    },
    output: {
        /**
         * 指定打包的的名字
         */
        filename: "build.js",
        path: path.resolve(__dirname, "dist", "01"),
        publicPath: "./"
    },
    module: {
        // 就一个file-loader
        rules: [
        {
            /**
             *  file-load 本质上是对源文件进行的一个拷贝
             *  需要安装file-loader
             */
            test: /\.(png|jpg|gif)/,
            use: ['file-loader']
        }
        ]
    }
}