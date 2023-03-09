import $ from "jquery";
// import('jquery');
const dom = new Proxy({}, {
    get: function(target, tag) {
        return function(props, children) {
            const el = document.createElement(tag)
            return el;
        }
    }
})
const btn = dom.button()  
document.body.appendChild(btn);
btn.addEventListener("click", function() {
    // 通过动态导入， 可以优化首屏加载缓慢的情况。 到触发该回调函数的时候才回去请求加载该文件
    import('loadsh').then(function(_) {
        console.log(_)
    })
})
const j = $({});
console.log(j,1);