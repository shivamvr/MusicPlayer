import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const SongDetails = ({id,cover,name,artist,getSongs}) => {


    const deleteSongHandler = async() => {
        // get song
       const res = await fetch('http://localhost:3000/songs/'+id)
       const resSong = await res.json()
       // Add to trash song
        await addToTrasn(resSong)
       // delete song
       await deleteSong(resSong)

       getSongs()
    }
    
    const deleteSong = async(song) => {
        await fetch('http://localhost:3000/songs/' + song.id,{
            method: 'DELETE'
        })
    }
    
    const addToTrasn = async (song) => {
        console.log('song:', song)
        await fetch('http://localhost:3000/trash',{
            method: 'POST',
            body: JSON.stringify(song),
            headers: {'Content-Type': 'application/Json'}
          })
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
            <button onClick={deleteSongHandler} ><FontAwesomeIcon icon={faTrashAlt}/></button>
        </li>
    )
}

export default SongDetails
