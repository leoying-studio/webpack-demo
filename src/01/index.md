### webpack 默认路径

webpack.config.js 默认不去指定路径，默认是在项目根目录的，而入口文件默认在src/index.js

### 手动修改指定的配置文件名称或者路径

在package.json 中通过webpack --config xxx 后面跟上路径和名称即可

例如：
```
 "scripts": {
    "build01": "webpack --config webpack.config01.js"
  },
```