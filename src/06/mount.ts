
type HTMELMerge<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T] & {
   setCss:  <T extends CSSStyleDeclaration>(options: Partial<T>) => void
}

function createElement<T extends keyof HTMLElementTagNameMap>(name: T): HTMELMerge<T> {
   const el = document.createElement(name);
   (el as HTMELMerge<T>).setCss = function (options) {
      for (let k in options) {
         el.style[k] = options[k];
      }
   }
   return el as HTMELMerge<T>;
}

export function init() {
   const div = createElement("div");
   div.setCss({
       width: "100px",
       height: "100px",
       backgroundColor: "red"
   });

   const img = createElement("img");
   img.src = "./imgs/1.jpg";
   div.appendChild(img)
   document.body.appendChild(div);
}