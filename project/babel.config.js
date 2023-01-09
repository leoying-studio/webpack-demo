module.exports = {
    presets: [
        [
            "@babel/preset-env", {
                // 可以设置为  false  usage entry
                // entry 根据当前筛选的browsnerlist的浏览器进行筛选, 同时使用 generator-runtime和corejs  
                // usage 根据源代码中使用到的进行填充, 但是需要注意排除node_modules中的三方依赖, 具体在webpack.config.js 中配置exclude属性
                useBuiltIns: 'usage',
                corejs: "3"
            }   
        ],
        ["@babel/preset-react"],
        ["@babel/preset-typescript"]
    ],
    plugins: ['react-refresh/babel']
}