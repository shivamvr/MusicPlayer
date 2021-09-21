import React from 'react'
import AddSong from './AddSong'
import DeleteSong from './DeleteSong'
import Trash from './Trash'
const Content = ({id}) => {
    const renderContent = () => {
        switch(id){
            case 'addSong':{
                return <AddSong/>
            }
            case 'deleteSong':{
                return <DeleteSong/>
            }
            case 'trash':{
                return <Trash/>
            }
            default:{
                return <AddSong/>
            }
        }
    }
    
    return (
        <div className='dash-content'>
           {renderContent()}
        </div>
    )
}

export default Content
