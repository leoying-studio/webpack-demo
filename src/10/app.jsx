import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client';
import { hot } from 'react-hot-loader/root';
import NavigationBar from './navgation-bar.jsx';
import AsideBar from './aside-bar.jsx'

console.log("app")
function App() {
    return (
        <main>
            <NavigationBar list={["首页", "新闻", "天气"]}></NavigationBar>
            <AsideBar></AsideBar>
            <footer></footer>
        </main>
    )
}

// 在入口的根组件进行包裹
const HotApp = hot(App);
createRoot(document.getElementById("app")).render(<HotApp></HotApp>)