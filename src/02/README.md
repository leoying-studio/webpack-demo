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

### css使用了url 属性， 如何处理

在css中如果碰到了url属性， 比如设置背景图， 此时会调用require 导致多出default 属性

解决方法

```
  {

        test: /\.css$/,
        use: ['style-loader', {
            loader: "css-loader",
            options: {
                // 解决加入 esModule: false 直接返回结果
                esModule: false
            }
        }]
  }
```

和file-loader一致加上esModule: false 直接返回结果即可