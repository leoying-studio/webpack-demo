## webpack中的拆包

为什么要进行拆包呢?

拆包是一种对项目平衡性取舍对优化方案

1. 有时候项目过大将所有的依赖打包在一个文件,作为首屏加载会出现卡顿,白屏的情况.  
2. 有时候当两个文件(多入口), 引用了同一个三方库, 并且不是从属关系会出现重复打包(每个文件都会把依赖打包进去), 造成文件变大资源浪费
3. 通过拆包, 可以缓存不需要经常变动的文件. 如第三方库, 根据[contenthash]来自动生成文件名, 如果内容不变就不会改变文件名称.  可以在
下一次访问中利用浏览器缓存节约http下载量
4. 可以实现模块的按需加载(在方法调用的时候才会加载), 减少http的一次性请求

拆包方式

### 多入口

```
  module.exports = {
      entry: { app: "./index.js", app1: "./index1.js" }
  }
```

通过这种方式, app 和 app1 就会打包成两个文件. 但是文件中的依赖即使相同,也会分别打包到两个文件中造成资源浪费

### 通过import 动态导入

```
  // 对于这种动态导入的会自动进行拆包, 打包到一个新的文件中
  import('jquery');
```

通过动态导入本质上也是实现了按需加载, 例子如下

```
  document.getElementById('button').click(function() {
      import('jquery').then(function($) {
          <!-- $.ajax({

          }) -->
      })
  })
```

### 分包的几种方式

*  默认为async 的意思是默认把异步导入的模块单独打包到一个chunk里面, 如 import('./utils.js')
*  只选择通过 import() 异步加载的模块来分离 chunks
*  initial 默认会把公用的都提取出来, 不管是同步还是异步的. 但是如果同步里面和异步分别引入了同一个模块,同步模块依然会把模块重复打包进去

总结: 从这几个选项来看, 最优选择还是 all, 是符合我们预期的

### 通过配置splitChunks

```
splitChunks: {
    // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
    chunks: "async",
    // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
    minSize: 30000,
    // 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1。
    minChunks: 1,
    // 表示按需加载文件时，并行请求的最大数目。默认为5。
    maxAsyncRequests: 5,
    // 表示加载入口文件时，并行请求的最大数目。默认为3。
    maxInitialRequests: 3,
    // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
    automaticNameDelimiter: '~',
    // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
    name: true,
    // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。默认将所有来自 node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
    cacheGroups: {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        },
        // 
    default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
        }
    }
}
``` 



地址: 
https://blog.csdn.net/JHY97/article/details/125229671