
function createElement<T extends keyof HTMLElementTagNameMap>(name: T): HTMLElement {
   const el =  document.createElement(name);
   return el;
}

export function init() {
   const div = createElement("div");
   div.style.width = '100px';
   div.style.height = '100px';
   div.style.backgroundColor = "red";   
   document.body.appendChild(div);
}