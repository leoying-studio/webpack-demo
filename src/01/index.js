/**
 *   file-loader 案例加载图片文件
 */
import bg from "./../../public/imgs/1.jpg";
const app = document.getElementById("app");
const image = document.createElement("img");
image.src = bg;
app.appendChild(image);
