import React from 'react'
import LibrarySong from './LibrarySong'
import { Link } from 'react-router-dom'
import AdminIcon from '@material-ui/icons/SupervisorAccountRounded';
function Library({songs, nightMode, setSongs, current, isPlaying, audioRef, libraryStatus, searchTerm, searchOnchangeHandler}) {
    return (
        <div className={`library ${libraryStatus ? 'active-library':''} ${nightMode ? 'library-night':''}`}>
            <h2>Library
            <button className='dash-btn'><Link to="/Dashboard"><AdminIcon/></Link> </button>
            </h2>
             <input className={`library-search ${nightMode && 'library-search-night'}`}  value={searchTerm} onChange={searchOnchangeHandler} type="text" placeholder='search' />
             {songs.map((song) => <LibrarySong nightMode={nightMode} key={song.id+''} setSongs={setSongs} songs={songs} song={song} current={current} isPlaying={isPlaying} audioRef={audioRef}/>)}
        </div>
    )
}

export default Library
