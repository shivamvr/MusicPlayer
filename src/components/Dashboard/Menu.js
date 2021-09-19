import React,{useState} from 'react'
import MenuItem from './MenuItem'

const Menu = ({setId}) => {
    const[activeItem,setActiveItem] = useState('users')

    const handleActiveItem = (id) => {
        setActiveItem(id)
    }

    const listData = [
        {id: 'users',
         title: 'User'},
        {id: 'addsong',
         title: 'Add songs'},
        {id: 'deleteSong',
         title: 'Delete songs'},
        {id: 'about',
         title: 'About'}
    ]
    return (
        <ul className='dash-menu'>
            {listData.map(item => <MenuItem id={item.id} key={item.id} activeItem={activeItem} handleActiveItem={handleActiveItem} title={item.title} setId={setId} />) }
        </ul>
    )
}

export default Menu
