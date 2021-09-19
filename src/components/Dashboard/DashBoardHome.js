import React, { useState } from 'react'
import Menu from './Menu'
import Content from './Content'

const DashBoardHome = () => {
    const[id,setId] = useState('users')
    return (
        <div className='dash-container'>
         <Menu setId={setId}></Menu>  
         <Content id={id}></Content>
        </div>
    )
}

export default DashBoardHome
