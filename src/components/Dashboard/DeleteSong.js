import React, { useEffect, useState } from 'react'
import SongDetails from './SongDetails'

const DeleteSong = () => {
const[songs,setSongs] = useState([{}])

useEffect(()=>{
 getSongs()
},[])


// Getting songs 
    const getSongs = async() =>  {
        let uri = 'http://localhost:3000/songs'
        const res = await fetch(uri)
        const songs = await res.json()
        // console.log('songs:', songs)
        setSongs(songs)
        // return songs
      }
    return (
        <div className='delete-song'>
            <input type="text" placeholder='Search'/>
             <ul>
                {songs.map(song=> <SongDetails key={song.id} id={song.id} cover={song.cover} name={song.name} artist={song.artist} getSongs={getSongs} />)} 
             </ul>
        </div>
    )
}

export default DeleteSong
