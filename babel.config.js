
module.exports = {
    // 数组中两个数组参数
   presets: [
        [
            "@babel/preset-env", {
                useBuiltIns: 'usage',
                corejs: "3"
            }   
        ],
        ["@babel/preset-react"],
        ["@babel/preset-typescript"]
   ],
   // 支持hooks的即使添加删除
   plugins: ["react-hot-loader/babel"]
}