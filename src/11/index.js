import './index.css';
import jpg1 from './../../public/imgs/1.jpg';
import jpg2 from './../../public/imgs/2.jpg';

var img = document.createElement("img");
img.src = jpg1;

var img2 = document.createElement("img");
img2.src = jpg2;

document.body.appendChild(img);
document.body.appendChild(img2);