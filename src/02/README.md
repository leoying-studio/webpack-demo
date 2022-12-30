### 导入图片的时候，通过require 和 import 的区别

如果用require 导入会多一个default 属性，

解决方法： 可以在file-loader 中的options 中新增 esModule: false

如下：
```
 // 增加具体配置
  test: /\.(png|jpe?g)$/, // 匹配常用的图片格式
  use: [
       {
           loader: 'file-loader',
           options: {
               // 是否将模块转换为esModule,false不转换
               esModule: false
           }
       }
  ]
```

反之就用import 导入

