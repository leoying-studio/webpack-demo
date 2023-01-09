import React, { useState } from "react";
import Nav from './nav'
import Footer from './footer'

// env 是在webpack中配置的环境, 编译完成到客户端之后,作为参数传递到了客户端, 可以通过该变量获取api 环境
console.log("app", env);

const App = () => {
   const [app, setApp]  = useState("app")
   return (<div>
      <Nav></Nav>
      <Footer></Footer>
   </div>)
}

export default App;