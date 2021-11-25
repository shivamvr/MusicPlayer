import React, {useState,useEffect} from 'react'
import TrashItem from './TrashItem'

const Trash = () => {

    const[songs,setSongs] = useState([{}])

    useEffect(()=>{
        getSongs()
       },[])
       

    const getSongs = async(term) =>  {
        const url = process.env.REACT_APP_URL
        let uri = `${url}/trash?_sort=id&_order=desc`
        const res = await fetch(uri)
        const songs = await res.json()
        setSongs(songs)
      }

    return (
        <ul> 
            <h2 style={{color: '#70829B', margin: '1rem .5rem'}}>Trash</h2>
            {songs.map(song=> <TrashItem key={song.id} id={song.id} cover={song.cover} name={song.name} artist={song.artist} getSongs={getSongs} />)} 
        </ul>
    )
}

export default Trash
