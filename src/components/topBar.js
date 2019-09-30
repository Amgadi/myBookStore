import React from 'react'

const TopBar = (props) => {
    return (
        <div align='center' className='navBar-top'>
                <h1>{props.title}</h1>
                <hr/>
        </div>
    )
}

export default TopBar;