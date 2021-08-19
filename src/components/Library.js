import React from 'react'
import LibrarySong from './LibrarySong'

function Library({songs, nightMode, setSongs, current, isPlaying, audioRef, libraryStatus}) {
    
    return (
        <div className={`library ${libraryStatus ? 'active-library':''} ${nightMode ? 'library-night':''}`}>
            <h2>Library</h2>
             {songs.map(song => <LibrarySong key={song.id} setSongs={setSongs} songs={songs} song={song} current={current} isPlaying={isPlaying} audioRef={audioRef}/>)}
        </div>
    )
}

export default Library
