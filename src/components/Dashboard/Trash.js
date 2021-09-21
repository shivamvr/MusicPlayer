import React, {useState,useEffect} from 'react'
import TrashItem from './TrashItem'

const Trash = () => {

    const[songs,setSongs] = useState([{}])

    useEffect(()=>{
        getSongs()
       },[])
       

    const getSongs = async(term) =>  {
        let uri = 'http://localhost:3000/trash?_sort=id&_order=desc'
        const res = await fetch(uri)
        const songs = await res.json()
        // console.log('songs:', songs)
        setSongs(songs)
        // return songs
      }

    return (
        <ul> 
            <h2 style={{color: '#4C52BC', margin: '1rem .5rem'}}>Trash</h2>
            {songs.map(song=> <TrashItem key={song.id} id={song.id} cover={song.cover} name={song.name} artist={song.artist} getSongs={getSongs} />)} 
        </ul>
    )
}

export default Trash
