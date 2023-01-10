import React from 'react';
import '/public/fonticon/iconfont.css'

const Icon: React.FC<{name: string}> = ({name}) => {
    return (
        <i className={'iconfont icon-' + name}></i>
    )
}

export default Icon;