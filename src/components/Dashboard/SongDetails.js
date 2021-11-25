import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const SongDetails = ({id,cover,name,artist,getSongs}) => {

    const url = process.env.REACT_APP_URL
    const deleteSongHandler = async() => {
        // get song
       const res = await fetch(`${url}/songs/`+id)
       const resSong = await res.json()
       // Add to trash song
        await addToTrasn(resSong)
       // delete song
       await deleteSong(resSong)

       getSongs()
    }
    
    const deleteSong = async(song) => {
        await fetch(`${url}/songs/` + song.id,{
            method: 'DELETE'
        })
    }
    
    const addToTrasn = async (song) => {
        await fetch(`${url}/trash/`,{
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
