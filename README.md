# webpack-demo

### webpack.config.js 重命名

1. 没有webpack.config.js
可以没有webpack.config.js文件, 执行webpack 命令,这个时候会去src/index 下的路径去寻找入口文件

2. 有webpack.config.js文件
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

## 为什么要使用webpack?

1. 模块化开发, 文件独立避免全局污染.
2. devServe 提供了即使更新和热更新体验,并且支持sourceMap
3. 配合corejs 实现语法兼容转换 和特定的框架语法编译
4. 按需加载


查看文章地址: https://juejin.cn/post/6850418111599165448