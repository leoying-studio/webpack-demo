const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin }  = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
const foldName = "12";

// 为什么需要用 splitChunks 进行分包处理

/**
 *  分包可以平衡项目取舍问题, 通过分包可以减少首屏加载的压力.
 *  根据内容自动生成 [conenthash] 文件名称, 如果内容一致文件名称不会再次改变, 可以利用浏览器缓存, 不用每次访问都去下载.js文件
 */

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
        filename: "[name].[contenthash].js",
        publicPath: "/dist/12/"
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: "public/temp/test.html"
        })
    ],
    // 启用optimization 优化jquery 打包, 解决别打包到输出文件的问题
    /**
     *  为什么要开启splitChunks, 默认会根据依赖分析，根据入口的key文件路径，对依赖全部打包到一个js文件里面。
     *  如果两个入口文件都引用了同一个库， 那么这两个入口文件会把库都打包进去， 造成了打包重复。
     *  设置了 all 会自动抽取公共的vendor包（node_modules下的包），这样就可以两个库分别共用公共部分， 减少打包资源占用（好比业务代码抽离公共部分一个道理）
     *  另外一个好处， 抽离的公共部分， 而这部分公共部分是不需要经常变动的，浏览器能够缓存该文件，不需要每次都下载达到优化的目的。
     * 
     * 
     *  因为直接设置all 是默认把公共的node_modules文件夹下面的东西打包到一个verdor 里面的， 如果其中一个库更新了，整个verdor会重新
     *  生成，但是尽管如此，这样的概率其实很低很低， 影响不大。 为此我们可以把每一个三方库单独拆分出来作为一个chunk
     */
    optimization:{
        splitChunks: {
         // 选择哪些 chunk 进行优化，可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为async,

         /**
          *  默认为async 的意思是默认把异步导入的模块单独打包到一个chunk里面, 如 import('./utils.js')
          *  只选择通过 import() 异步加载的模块来分离 chunks
          *  
          *  initial 默认会把公用的都提取出来, 不管是同步还是异步的. 但是如果同步里面和异步分别引入了同一个模块,同步模块依然会把模块重复打包进去
          * 
          *  从这几个选项来看, 最优选择还是 all, 是符合我们预期的
          */
          chunks: 'all',
          /**
           *  这个选项对，具体的文件单独拆包就跟他的名字一样，拆出来作为缓存用
           *  对node_modules 下面的每一个文件进行单独拆包
           */

          // 该选项指的是如果 cacheGroups 有多个模块需要拆分, 并且在实际的项目中也都满足条件要求, 但是最大不能超过 maxInitialRequests 的值, 
          // 如果超过了, 则自动合并到较大的一个 chunks 里面去.  个人觉得这个值没有必要,或者设置到最大即可
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
             verdor: {
                test:  /[\\/]node_modules[\\/]/,
                name(module) {
                     const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                     return packageName;
                }
             }
          }
        }
    }
}