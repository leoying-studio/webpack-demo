## webpack + live-server 方案实现热更新

### 即时更新

1. 通过 build 的命令后面加上 --watch 可以监听文件的变动然后重新build

```
   webpack --config webpack.config07.js --watch
```

2. 通过配合 vscode 插件 live-server 来监听打包后的html变化  build之后不需要手动刷新浏览器即可完成更新.

具体操作: 
- vscode 搜索下载dev-server 
- 选择dist目录下的html文件,然后右键选择live-server 打开


总结:

方案: build watch + live-server 实现了即使刷新

不足: 
1. 基于硬盘读写,每次都会重新编译并且生成到本地目录文件
2. 不能实现局部刷新

不推荐