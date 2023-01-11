const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const foldName = "12";

module.exports = {
    mode: "development",
    // 由于两个文件都用到了jquery, 如果不用(optimization)优化都话.
    // 默认该多入口文件会把jquery 都分别打包到输出文件,也就是打包两次, 造成代码重复
    entry: {
        index: `./src/${foldName}/index.js`,
        app: `./src/${foldName}/app.js`
    },
    output: {
        path: path.resolve(__dirname, "dist", foldName),
        filename: "[name].js",
        publicPath: "/dist/12/"
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/temp/test.html"
        })
    ],
    // 启用optimization 优化jquery 打包, 解决别打包到输出文件的问题
    optimization:{
        splitChunks: {
         // 选择哪些 chunk 进行优化，可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all,
        //   chunks: 'all',
        }
    }
}