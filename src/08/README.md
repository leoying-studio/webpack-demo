## devServe 是什么? 

前面的文件编译输出是通过生成文件到本地磁盘,然后再打开的.  而devServe通过编译到内存里面,通过内存访问可以大大提高效率

## 使用条件

1. 安装依赖

``` 
  yarn add webpack-dev-server -D
```

2. 执行命令

```
  webpack serve  

  // 默认依然会寻找src/index 作为入口文件
```
可以通过package.json 来指定webpack.config.js 文件的路径和名称

```
 webpack serve --config webpack.config08.js --open
// 加上 --open 每次启动都会打开浏览器运行
```

## devServe模式下的output 

在本地环境下打开, 应该采用相对路径, 而devServe 作为服务器访问, 应该采用根路径的模式来访问.

```
    output: {
        /**
         * 指定打包的的名字
         */
        filename: "build.js",
        path: path.resolve(__dirname, "dist", foldName),
        // 服务端访问, 应该采用 "/", 否则会出现找不到文件的情况 
        publicPath: "/"
    },
```