import React from 'react'

const MenuItem = ({activeItem, setId,id,title,handleActiveItem}) => {
    const handleClick = () => {
        setId(id)
        handleActiveItem(id)
    }
    
    return (
        <li className={`${activeItem===id && 'dash-active-item'}`}  onClick={handleClick}>{title}</li> 
    )
}

export default MenuItem


