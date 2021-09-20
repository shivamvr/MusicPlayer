import React, {useEffect, useRef, useState} from 'react'
import './styles/app.scss'
import Song from './Song'
import Player from './Player'
// import data from './data'
import Library from './Library'
import Nav from './Nav'


function App(){
   // ---------------------STATES--------------------------
   const audioRef = useRef(null)
   const [songs, setSongs] = useState([])
   const [isPlaying, setIsPlaying] = useState(false)
   const [currentSong, setCurrentSong] = useState({})
   const [songInfo, setSongInfo] = useState({currentTime: '',duration: '', animationPrecentage: 0})
   const [libraryStatus, setLibraryStatus] = useState(false)
   const [nightMode, setNightMode] = useState(false)
   
   // ---------------------FUNCTIONS-------------------------
   const chillHop = async() =>  {
      let uri = 'http://localhost:3000/songs'
      const res = await fetch(uri)
      const songs = await res.json()
      console.log('songs:', songs)
      setSongs(songs)
      setCurrentSong(songs[0])
      console.log('currentSong: ',currentSong)
      // activeLibraryHandler(currentSong)
      // return songs
   }

   // USE Effect
   useEffect(()=>{
      chillHop()
   },[])

   const timeUpdateHandler = (e)=>{
      const currentTime = e.target.currentTime
      const duration = e.target.duration
      const calulatePercentage = (songInfo.currentTime/duration*100).toFixed(2)
      setSongInfo({...songInfo,currentTime: currentTime,duration: duration, animationPrecentage: calulatePercentage})
  }
  const songEndHandler = async()=>{
   const currentIndex = songs.findIndex((song)=> song.id === currentSong.id)
   if(currentIndex === songs.length-1){
      await setCurrentSong(songs[0])
      activeSongHandler(songs[0])
      // await setSongs([...songs,songs[0].active=true,songs[songs.length-1].active=false])
   }else{
      await setCurrentSong(songs[currentIndex + 1])
      activeSongHandler(songs[currentIndex + 1])
      // await setSongs([...songs,songs[currentIndex+1].active=true,songs[currentIndex].active=false])
   }
   if(isPlaying) audioRef.current.play()
  }

  // ActiveSongHandler
  const activeSongHandler = (activeSong)=>{
   const newSongs = songs.map((newSong) => {
       if (newSong.id === activeSong.id) {
         return { ...newSong, active: true }
       } else {
         return { ...newSong, active: false }
       }
     })
     setSongs(newSongs)
     if(isPlaying) audioRef.current.play()
 }

    return (
      <div className={`container ${nightMode ? `night-mode`:''} ${libraryStatus && 'library-added'}`}>
         <Nav nightMode={nightMode} setNightMode={setNightMode} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
         <Song currentSong={currentSong} />
         <Player activeSongHandler={activeSongHandler} currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo}/>
         <Library nightMode={nightMode} currentSong={currentSong} setCurrentSong={setCurrentSong} libraryStatus={libraryStatus} songs={songs} setSongs={setSongs} current={setCurrentSong} isPlaying={isPlaying} audioRef={audioRef}/>
         <audio onEnded={songEndHandler} ref={audioRef} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} src={currentSong.audio}></audio>
      </div>
     
    )
}
export default App
