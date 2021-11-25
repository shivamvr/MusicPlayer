import React   from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

const TrashItem = ({ id, cover, name, artist, getSongs }) => {
  const url = process.env.REACT_APP_URL
  const deleteSongHandler = async () => {
    await fetch(`${url}/trash/` + id, {
      method: 'DELETE',
    })
    getSongs()
  }
  
  const restoreSongHandler = async () => {
    const res =  await fetch(`${url}/trash/`+ id)
    const resSong = await res.json()
    await restoreSong(resSong)
    await deleteSong(resSong)
  }

  const restoreSong = async (song) => {
    await fetch(`${url}/songs/`,{
        method: 'POST',
        body: JSON.stringify(song),
        headers: {'Content-Type': 'application/Json'}
      })
  }
  
  const deleteSong = async(song) => {

    await fetch(`${url}/trash/` + song.id,{
        method: 'DELETE'
    })
    getSongs()
}


  return (
    <li style={{width: '43%'}} className="song-details">
      <div>
        <img src={cover} alt="" />
      </div>
      <div>
        <p className="name">{name}</p>
        <p className="artist">{artist}</p>
      </div>
      <span className='trash-item-btn'>
      <button onClick={deleteSongHandler}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      <button onClick={restoreSongHandler} style={{background: 'pink'}}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      </span>
    </li>
  )
}

export default TrashItem
