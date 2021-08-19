import React from 'react'
function Song({song, songs, setSongs, current, audioRef, isPlaying}) {
    const songClickHandler = async()=>{
        await current(song)
        const newSongs = songs.map((newSong) => {
          if (newSong.id === song.id) {
            return { ...newSong, active: true }
          } else {
            return { ...newSong, active: false }
          }
        })
        await setSongs(newSongs)
        
        if(isPlaying) audioRef.current.play()
    }
   
    return (
        <div onClick={songClickHandler} className={`library-song ${song.active ? 'selected':''}`}>
         <img src={song.cover} alt="" />
         <div className='description'>
         <h3>{song.name}</h3>
         <h4>{song.artist}</h4>
         </div>
        </div>
    )
}

export default Song

