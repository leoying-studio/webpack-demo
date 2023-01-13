const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const {merge} = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const commonConfig = require("./webpack.common");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const utils = require("./webpack.utils");
const buildConfig = require("./../config/build");

// 生成的文件名称有利于我们做浏览器缓存,如果每次都生成新的就没办法使用缓存
const webpackProdConfig = {
    mode: "production",
    // optimization: {
    //     // 为了浏览器做长期的缓存, 添加后会把解析的代码专门生成到一个runtime文件中
    //     // 主文件名称设置为contenthash的话不会每次打包都发生变化
    //     runtimeChunk: true,
    //     splitChunks: {
    //         // 配置项为all或者initial，包含对同步代码引入进行代码分割时，还需兼顾cacheGroups里面的配置。
    //         // 一般将三方库打在一起, 可以利用浏览器缓存, 因为三方库不是经常变动的.  将业务代码另外打在一起
    //         chunks: "all",
    //         // chunks: 'initial',
    //         // // 超过20kb才会进行拆分
    //         // minSize: 20 * 1024,
    //         // //非按需导入时,至少被引用了两次才会被拆分出来, 该优先级大于minSize
    //         // minChunks: 1,
    //         automaticNameDelimiter: "~" // 抽取出来的文件的自动生成名字的分割符，默认为 ~；
    //         // // 通过cacheGroups 会把第三方共用的库打包在一个文件里面
    //         // cacheGroups: {
    //         //     // vender 这个key 可以随便自定义(多包裹一层)
    //         //     // 当设置了多个会根据条件去匹配, 根据满足条件当进行打包
    //         //     vender: {
    //         //         test: /[\\/]node_modules[\\/]/,
    //         //         filename: "[id]_vender.js"
    //         //     },
    //         //     // 非第三方,但是自定义多次导入第包,可能会放入这里面
    //         //     default: {
    //         //         minChunks: 1,
    //         //         filename: "[hash].js"
    //         //     }
    //         // }
    //     }
    // },
    output: {
        path: utils.resolve('dist'),
        filename: '[name].[contenthash:8].js',
        publicPath: "./",
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        // 开发环境是不需要的, 再下次创建之前,先清空dist目录
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        // 该插件主要用于生产环境,拷贝一些没有打包的静态资源,也就是没有import的资源文件, 比如手动引入的js本地文件
        new CopyPlugin({
            patterns: [
                {
                    from: utils.resolve("public", "utils.js"),
                    to: utils.resolve("dist", "utils.js"),
                }
            ]
        }),
        // 该插件需要和 webpack.DllPlugin 配合使用
        // 先通过脚本执行 yarn dll, 生成共用的lib后续就不用再生成了(执行一次即可)
        new webpack.DllReferencePlugin({
            context: utils.resolve('dist', 'dll'),
            manifest: utils.resolve('lib-manifest.json')
        })
    ]
}

/**
 *  如果开启了该配置, 则使用代码压缩
 */
if (buildConfig.gzip) {
    const cw = new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        ["js","css"].join('|') +
        ')$'
      ),
      threshold: 10 * 1024,
      minRatio: 0.8
    })
    console.log("gzip")
    webpackProdConfig.plugins.push(cw);
}

module.exports = merge(commonConfig, webpackProdConfig);