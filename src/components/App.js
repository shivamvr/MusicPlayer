import React, { useEffect, useRef, useState } from 'react'
import './styles/app.scss'
import Song from './Song'
import Player from './Player'
// import data from './data'
import Library from './Library'
import Nav from './Nav'

function App() {
  // ---------------------STATES--------------------------
  const audioRef = useRef(null)
  const [songs, setSongs] = useState([{}])
  const [searchTerm, setSearchTerm] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState({})
  const [songInfo, setSongInfo] = useState({
    currentTime: '',
    duration: '',
    animationPrecentage: 0,
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [nightMode, setNightMode] = useState(false)

  // ---------------------FUNCTIONS-------------------------
  const chillHop = async (term) => {
    let uri = 'http://localhost:3000/songs?_sort=id&_order=asce'
    if(searchTerm) {
      uri = uri + `&q=${term}`
    }
    const res = await fetch(uri)
    const resSongs = await res.json()
    if(resSongs.length){
       setSongs(resSongs)
       setCurrentSong(resSongs[0])
    }
  }

  // USE Effect
  useEffect(() => {
    chillHop()
   }, [])
   
   const searchOnchangeHandler = (e) => {
      const { value } = e.target
      setSearchTerm(value)
      chillHop(searchTerm)
      audioRef.current.pause()
      setIsPlaying(false)
  }

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    const calulatePercentage = (
      (songInfo.currentTime / duration) *
      100
    ).toFixed(2)
    setSongInfo({
      ...songInfo,
      currentTime: currentTime,
      duration: duration,
      animationPrecentage: calulatePercentage,
    })
  }
  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (currentIndex === songs.length - 1) {
      await setCurrentSong(songs[0])
      activeSongHandler(songs[0])
    } else {
      await setCurrentSong(songs[currentIndex + 1])
      activeSongHandler(songs[currentIndex + 1])
    }
    if (isPlaying) audioRef.current.play()
  }

  // ActiveSongHandler
  const activeSongHandler = (activeSong) => {
    const newSongs = songs.map((newSong) => {
      if (newSong.id === activeSong.id) {
        return { ...newSong, active: true }
      } else {
        return { ...newSong, active: false }
      }
    })
    setSongs(newSongs)
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div
      className={`container ${nightMode ? `night-mode` : ''} ${
        libraryStatus && 'library-added'
      }`}
    >
      <Nav
        nightMode={nightMode}
        setNightMode={setNightMode}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} />
      <Player
        activeSongHandler={activeSongHandler}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <Library
        nightMode={nightMode}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        libraryStatus={libraryStatus}
        songs={songs}
        setSongs={setSongs}
        current={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchOnchangeHandler={searchOnchangeHandler}
      />
      <audio
        onEnded={songEndHandler}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
      ></audio>
    </div>
  )
}
export default App
