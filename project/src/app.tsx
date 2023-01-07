import React, { useState } from "react";


const App = () => {
   const [app, setApp]  = useState("app")
   return (<div>{app}</div>)
}

export default App;