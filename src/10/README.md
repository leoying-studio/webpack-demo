## React 安装
- ```yarn add react```
- ```yarn add react-dom```

## React 编译

```
{
    module: {
        rule: [
            {
                use:/\.jsx?$/,
                loader: ['babel-loader']
            }
        ]
    }
}

// 匹配jsx 文件,通过babel-loader 来加载
```

## 针对react 配置babel.config.js

- 先安装 ```yarn add @babel/preset-env -D```
- 再安装 ``` yarn add @babel/preset-react```

```
  presets:[["@babel/preset-env"], ["@babel/preset-react"]]
```

到这一步只能完成react 的编译和开发, 但是开发过程并不能实现热更新(HMR)


## 开启react HMR (方案一)

添加react-refresh-webpack-plugin ， 结合react 预设来实现热更新

```
    const ReactRefreshWebpackPlugin = require("react-refresh-webpack-plugin")

    // webpack.config.js 
    plugins: [
        new ReactRefreshWebpackPlugin()
    ]
```

接着配置babel插件  babel.config.js 文件 

```
    plugins: [
        'react-refresh/babel'
    ]
```

## 方案二(本案例中使用的)

1. 首先安装  ``` yarn add react-hot-loader ```

// 使用, 在入口的根组件进行包裹
```
import { hot } from 'react-hot-loader/root';

function App() {
    return (
        <main>
            <div></div>
        </main>
    )
}

const HotApp = hot(App);
createRoot(document.getElementById("app")).render(<HotApp></HotApp>)
```

2.  babel.config.js 配置plugins: ["react-hot-loader/babel"]

完整配置
```
module.exports = {
    // 数组中两个数组参数
   presets: [
        [
            "@babel/preset-env", {
                useBuiltIns: 'usage',
                corejs: "3"
            }   
        ],
        ["@babel/preset-react"]
   ],
   plugins: ["react-hot-loader/babel"]
}

```

3.  @hot-loader/react-dom 解决组件修改删除 hooks的时候出现页面整体刷新

安装 ``` @hot-loader/react-dom ```

```
   // webpack.config.js
    module.exports = {
        // ...
        resolve: {
            alias: {
            'react-dom': '@hot-loader/react-dom',
            },
        },
    };

```

以上配置,可以建立一个映射关系


总结: 

1. 安装react-hot-loader并且包裹入口组件
2. 添加 babel 插件 react-hot-loader/babel
3. 添加一个新 alias 为 'react-dom': '@hot-loader/react-dom' ，将 react-dom 映射到 @hot-loader/react-dom

其中第三步为开发体验优化