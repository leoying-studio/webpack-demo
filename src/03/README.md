### url-loader 是更加好的加载器

如下：
```
  test: /\.(png|jpe?g)$/, // 匹配常用的图片格式
  use: [
       {
           loader: 'url-loader',
           options: {
               // 50k以内就通过base64编码, 否则就通过file-loader 来拷贝
               limit: 50 * 1024
           }
       }
  ]
```

url-loader 作为一个loader 加载器, 是通过把资源文件转换成base64, 好处是可以作为优化手段,减少http请求次数, 缺点是转换成base64反而会增加
文件体积, 通过limit 属性控制可以设置一个阈值, 内部实际上也是调用当file-loader.  

