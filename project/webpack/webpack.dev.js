const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");
const utils = require("./webpack.utils");

const devConfig = {
    // 这是一个大的控制属性, 如果为"production" 会自动屏蔽devtool源码
    mode: "development",
    output: {
        publicPath: "/",
    },
    // 方便调试, 有eval source-map 几种方式
    devtool: "eval-source-map",
    devServer: {
        // 热更新需要开启此选项
        hot: true,
        // 指定端口
        port: 8080,
        static: {
            // 服务器环境下, 服务器路径下对应 directory 的路径
            // localhost:8080/ 此时根路径就是对应public的路径
            // localhost:8080/1.jpg 就能访问到public 下的内容
            publicPath: '/',
            directory: utils.resolve("public")
        }
    },
    target: 'web',
    plugins: [
        // 该插件只能在开发环境中进行使用, build 模式下会出现错误
        new ReactRefreshWebpackPlugin()
    ]
}

module.exports = merge(devConfig, commonConfig)