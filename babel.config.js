
module.exports = {
    // 数组中两个数组参数
   presets: [
        [
            "@babel/preset-env", {
                useBuiltIns: 'usage',
                corejs: "3"
            }   
        ],
        ["@babel/preset-typescript"]
   ]
}