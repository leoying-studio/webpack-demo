### babel-loader 

**负责语法的编译转换工作,包括对ts文件的编译.**

之前的ts 编译工作用到了ts-loader, 在编译中会去校验ts的语法错误,但是对于较新的语法不会进行转换(直接输出), 比如Promise.  而babel-loader
作为一个代码编译的多功能型loader, 提供了js 和 ts 的语法兼容和加载.  所以对于js和ts的编译工作全部可以都通过babel-loader 来解决就行了

### babel-loader 的使用

babel-loader 通过配置webpack 

```
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["babel-loader"]
            }
        ]
    }
```

此时会申明使用了 babel-loader, 但是并不会生效. 因为babel-loader 本身只是一个加载的主体,具体使用需要通过再次配置babel.config 来完成


### babel.cofig.js 

babel.config.js 作为babel-loader的配置开关, 只有配置了才会生效.  当配置了babel-loader 之后会在根目录去寻找babel.config.js文件寻找配置项目

首先需要安装以下依赖:
- ``` yarn add  @babel/reset-env```
- ``` yarn add core-js@3 ```
- ``` yarn add  @babel/preset-typescript```

```
     module.exports = {
         presets:[
             [
                "@babel/reset-env", {
                    useBuiltIns: 'usage',
                    corejs: "3"
                }
            ],
            ["@babel/preset-typescript"]
         ] 
     }
```

从以上代码可以看出, presets属性是一个预设, 也就是大多数常用的默认配置.  presets 实际上是一个二维数组, 而二维数组内部其实第一个参数是@babel/xxx的插件名称, 第二个参数为配置项


#### @babel/reset-env

是一个常用的集合配置, 常用的有专门针对箭头函数的, 有针对await的等等, 而这个则是囊括了整体常用的

### @babel/preset-typescript

则是专门针对ts进行编译的


### watch 模式

```
   "build05": "webpack --config webpack.config05.js --watch",
```

加上--watch