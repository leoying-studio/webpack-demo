import './foo';

console.log("123")

/**
 *  参数数组中指定哪些是需要热更新的模块, 填写具体的路径
 */

// 此处的hot 对应webpack 中 devServer 中的hot
if (module.hot) {
    // 参数中的数组,就是需要热更新的路径, 表明哪些是需要开启热更新的模块
    module.hot.accept(["./foo.js"], () => {
        console.log("aaaaa")
    })
}