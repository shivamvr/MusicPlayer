import React from 'react'
function Song({currentSong,nightMode}) {
    return (
        <div className={`song ${nightMode && 'song-night'}`}>
         <img src={currentSong.cover} alt="" />
         <h2>{currentSong.name}</h2>
         <h3>{currentSong.artist}</h3>
        </div>
    )
}

export default Song
