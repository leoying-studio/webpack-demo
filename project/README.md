# 架构

通过webpack打包工具搭建了开发和生产环境

## plugin

重点解说一下 new webpack.DllPlugin 和  DllReferencePlugin 这二者是配合使用的.  首先DllPlugin 会根据配置好的入口文件,打包成文件. 并且生成manifest.json  


所以第一步先执行 ```yarn dll ``` 生成固定好的三方库,后面就不再生成

再去正常执行yarn prod, plugins 使用了 ``` DllReferencePlugin ``` 插件, 这个时候会去(根据manifest)关联上webpack.dll 所生成的文件. 


