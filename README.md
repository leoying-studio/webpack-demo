# webpack-demo

## 为什么要使用webpack?

1. 模块化开发, 文件独立避免全局污染.
2. devServe 提供了及时更新和热更新服务,提升开发体验
3. 配合corejs 实现语法兼容转换
4. 按需加载
5. 支持loader 编译, 甚至可以通过nodejs 完成对图片文件base64的转换工作
6. 文件合并或者拆包,减少http文件请求

查看文章地址: https://juejin.cn/post/6850418111599165448

## 为什么要搞一大堆工程化的东西?  

1. 传统的项目,没有工程化可能引入一堆的script标签, 这个时候变量命名冲突的可能性就增加很多.
2. 即使本地使用了requirejs实现了模块化, 但是毕竟是写在磁盘里面的,每一次的修改都需要手动刷新一下浏览器,开发体验不好.
3. webpack serve 开发模式是直接将文件编译写入到计算机的内存中,内存的读写效率和速度远比磁盘快, 并且实现局部更新
4. 基于nodejs 具备io读写能力,  webpack 具有文件合并, 打包的压缩的优势

总而言之, 基于工程化本质上是实现了一整套的项目解决方案, 让开发者获得更好的开发体验和打包需求. 配置好后, 用户只需要关心业务代码
和基于现有的生态框架, 快速开发出应用.

### webpack.config.js 重命名

1. 如果没有webpack.config.js 的情况
执行webpack 命令,这个时候会去src/index 下的路径去寻找入口文件 -- index.js

2. 如果有webpack.config.js文件的情况
webpack.config.js 默认是在项目根目录的

3. 手动修改指定的配置文件名称或者路径

在package.json 中通过webpack --config xxx 后面跟上路径和名称即可

例如：
```
 "scripts": {
    "build01": "webpack --config webpack.config01.js"
  },
```

### babel.config.js 

当使用了babel-loader 默认就会去根目录查找babel.config.js/.babelrc 文件二者均可

```

// babel.config.js
module.exports = {
    // 数组中两个数组参数
   presets: [
        [
            "@babel/preset-env", {
                // 可以设置为  false  usage entry
                // entry 根据当前筛选的browsnerlist的浏览器进行筛选, 同时使用 generator-runtime和corejs  
                // usage 根据源代码中使用到的进行填充, 但是需要注意排除node_modules中的三方依赖, 具体在webpack.config.js 中配置exclude属性
                useBuiltIns: 'usage',
                corejs: "3"
            }   
        ]
   ]
}


// index.js 入口文件

import "core-js/stable";
import "regenerator-runtime/runtime;

new Promise(() => {

})
```

总结： 
1. preset-env 虽然提供了大部分转换，但是对于复杂的语法依然不支持。 所以需要使用
默认官方没有包含该插件， 通过自己灵活配置可以减少打包体积
2. babel/polyfill  体积较大 ，可以替换为为两部分 corejs 和 regenerator-runtime
3. "useBuiltIns": "useage" 会去代码中找需要转换的语法，根据需要去转换。 同时需要设置corejs的版本
4. "useBuiltIns": "entry" 根据需要兼容的浏览器来决定填充什么（bronwserlist）
安装之后，实际上还是通过preset-env 来具体配置

