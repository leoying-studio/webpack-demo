## 没有webpack.config.js

可以没有webpack.config.js文件, 执行webpack 命令,这个时候会去src/index 下的路径去寻找入口文件

### 有webpack.config.js文件

webpack.config.js 默认是在项目根目录的

### 手动修改指定的配置文件名称或者路径

在package.json 中通过webpack --config xxx 后面跟上路径和名称即可

例如：
```
 "scripts": {
    "build01": "webpack --config webpack.config01.js"
  },
```