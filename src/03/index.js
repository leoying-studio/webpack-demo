import "./index.css";
// 这里用的require 导入，用require 需要注意可能多一个default属性， 但是这里配置了file-loader 的options 属性, 所以依然可以正常运行
const bg = require("./../../public/1.jpg")
const app = document.getElementById("app");
const image = document.createElement("img");
image.src = bg;
image.style.width = "100px";
app.appendChild(image);



