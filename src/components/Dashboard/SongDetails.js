import React from 'react'


const SongDetails = ({id,cover,name,artist,getSongs}) => {
    const deleteSongHandler = async() => {

        await fetch('http://localhost:3000/songs/' + id,{
            method: 'DELETE'
        })
        getSongs()
    }


    
    
    return (
        <li className='song-details'>
            <div>
                <img src={cover} alt="" />
            </div>
            <div>
                <p className='name'>{name}</p>
                <p className='artist'>{artist}</p>
            </div>
            <button onClick={deleteSongHandler} >delete</button>
        </li>
    )
}

export default SongDetails
