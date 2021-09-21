import React from 'react'
import LibrarySong from './LibrarySong'

function Library({songs, nightMode, setSongs, current, isPlaying, audioRef, libraryStatus, searchTerm, searchOnchangeHandler}) {
    // Handler
    
    return (
        <div className={`library ${libraryStatus ? 'active-library':''} ${nightMode ? 'library-night':''}`}>
            <h2>Library</h2>
             <input value={searchTerm} onChange={searchOnchangeHandler} type="text"style={{width:'90%',margin: '1rem auto',marginTop: '-1rem',padding: '.6rem'}} placeholder='search' />
             {songs.map(song => <LibrarySong key={song.id} setSongs={setSongs} songs={songs} song={song} current={current} isPlaying={isPlaying} audioRef={audioRef}/>)}
        </div>
    )
}

export default Library
