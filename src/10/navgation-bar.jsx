import React from 'react'

console.log("nav2445");
const NavigationBar = ({ list }) => {
    return (
        <nav>
            <ul>
                {
                    list.map((item) => {
                        return <li key={item}>{item}</li>
                    })
                }
            </ul>
        </nav>
    )
 }
 export default NavigationBar;