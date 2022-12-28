
## 冲突解决

开发模式下可能会出现  mode: "development" 和browsnerlist 产生冲突， 加上target: "web"
则会忽略browsnerlist 配置

```
    module.exports = {
    mode: "development",
    entry: {
        path: path.resolve(__dirname, "src", foldName, "index.js")
    },
    devServer: {
        // 开启hot 属性
        hot: true
    },
    // 加上target属性,避免冲突
    target: "web",
    output: {
        /**
         * 指定打包的的名字
         */
        filename: "build.js",
        path: path.resolve(__dirname, "dist", foldName),
        // 在使用devServer的模式下, 这里不能使用相对路径, 应该使用根路径, 否则会出现找不到对应目录的情况
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```

另外需要开启, devServer 下的hot属性为true, 但是单纯开启并不能生效,默认还是会全局刷新.

## 手动控制热更新

```
    // index.js 入口文件

    // 通过module.hot 来进行判断哪些需要热更新, 其中该字段会在编译阶段完成处理(经过服务端编译, 然后再输出到客户端), 可以理解为一套代码经过了两套环境
    if (module.hot) {
         // 参数中的数组,就是需要热更新的路径, 表明哪些是需要开启热更新的模块
        module.hot.accept(["./foo.js"], () => {
            console.log("aaaaa")
        })
    }
```



总结: 
1. 第一步设置 devServer 的 hot: true, 但是依然不具备热更新功能
2. 继续通过api 热更新, module.hot 来判断和设置
3. 开启服务, 第一步会先判断环境,通过服务端编译该代码然后再输出到客户端, 实际上一套代码是经过了服务端到客户端到这样一个过程
