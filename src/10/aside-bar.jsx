import React from 'react'

console.log("aside");
const AsideBar = ({ list = [] }) => {
    return (
        <aside>
            <ul>
                {
                    list.map((item) => {
                        return <li key={item}>{item}</li>
                    })
                }
            </ul>
        </aside>
    )
 }
 export default AsideBar;