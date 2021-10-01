import React, { useEffect, useState } from 'react'
import SongDetails from './SongDetails'

const DeleteSong = () => {
const[songs,setSongs] = useState([{}])
const[searchTerm,setSearchTerm] = useState('')

useEffect(()=>{
 getSongs()
},[])


// Getting songs 
    const getSongs = async(term) =>  {
        let uri = 'http://localhost:3000/songs?_sort=id&_order=desc'
        if(searchTerm){
            uri += `&q=${term}`
        }
        const res = await fetch(uri)
        const songs = await res.json()
        // console.log('songs:', songs)
        setSongs(songs)
        // return songs
      }

   // Searching song
   const searchOnchangeHandler = (e) => {
       const {value} = e.target
       setSearchTerm(value)
       getSongs(value)
   }
   
     
    return (
        <div className='delete-song'>
            <input onChange={searchOnchangeHandler} value={searchTerm} type="text" placeholder='Search'/>
             <ul>
                {songs.map(song => <SongDetails key={song.id} id={song.id} cover={song.cover} name={song.name} artist={song.artist} getSongs={getSongs} />)} 
             </ul>
        </div>
    )
}

export default DeleteSong
