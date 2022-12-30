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