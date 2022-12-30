plugin可以提供更多的功能， 比如对css进行压缩甚至打包压缩， 每个plugin其实本质上是一个类

### html-webpack-plugin

一个可以自动生成html文档的插件， 默认生成一个空的html模板

```
const HtmlWebpackPlugin = require('html-webpack-plugin')

 plugins: [
   new HtmlWebpackPlugin()
 ]
```

### definePlugin

const {Define-plugin} = require(webpack') 可以通过该插件定义模板变量， 通过该变量渲染ejs的变量值， 例如

```
    <title><%= TITLE =%></title>

     plugins: [
        new HtmlWebpackPlugin({
                title: '这是标题'，
                template: "./public/index.html"
            }),
            new DefinePlugin({
                TITLE: '"这是标题“'
            })
     ]
    
 // 注意： 定义的TITLE的值需要加上双引号，因为在实际打包中会直接把值编译拼接上，导致编译报错。加上双引号会编译成一个变量
```

** 注意： 定义的TITLE的值需要加上双引号，因为在实际打包中会直接把值编译拼接上，导致编译报错。加上双引号会编译成一个变量**

### copy-webpack-plugin

```
 const CopyWebpackPlugin = require('copy-webpack-plugin')
  
  
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            {
                from: "public",
                // 不设置to的话会默认读取output目录
                to: 'dist'
            }
        ]
    })
  ]
  
  plugins: [
   new HtmlWebpackPlugin({
        title: '这是标题'，
        template: "./public/index.html"
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
                from: "public"
                // 不设置to的话会默认读取output目录
                to: 'dist',
                // 设置拷贝目录下需要忽略拷贝的文件
                globOptions: {
                    // 注意需要添加**/
                    ignore: ['**/index.html']
                }
            }
        ]
    })
  ]
```

小结
- 通过CopyWebpackPlugin可以指定需要拷贝的文件到指定目录(默认是到配置的输出目录, 可以不去配置到达目录)
- HtmlWebpackPlugin 默认会根据定义好的模板生成好html文件到指定输出目录, 如果这个时候拷贝中有与其他插件重复的文件, 可以设置忽略(ignore)
- 设置忽略的时候, 注意加上**/ 意思是从拷贝的资源目录下去忽略