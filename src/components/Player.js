import React from 'react'
import RepeatIcon from '@material-ui/icons/RepeatRounded'
import RepeatOneIcon from '@material-ui/icons/RepeatOneRounded'
import VolumeOffIcon from '@material-ui/icons/VolumeOffRounded'
import VolumeUpIcon from '@material-ui/icons/VolumeUpRounded'
import PlayIcon from '@material-ui/icons/PlayArrowRounded'
import PauseIcon from '@material-ui/icons/PauseRounded'
import SkipNext from '@material-ui/icons/SkipNextRounded'
import SkipPrevious from '@material-ui/icons/SkipPreviousRounded'

function Player({
  nightMode,
  activeSongHandler,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,
  songs,
  loopHandler,
  loopStatus,
  isMute,
  muteHandler,
}) {
  const len = Object.keys(currentSong).length

  const inputPercentage = {
    transform: `translateX(${songInfo.animationPrecentage}%)`,
  }

  const inputColor = {
    background: `linear-gradient(to right, ${
      len ? currentSong.color[0] : ''
    } , ${len ? currentSong.color[1] : ''})`,
  }
  // -----------FUNCTIONS-------------
  const playSongHandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying)
      audioRef.current.pause()
    } else {
      setIsPlaying(!isPlaying)
      audioRef.current.play()
    }
  }

  const getTime = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  const songSkipHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const last = songs.length - 1
    if (direction === 'skipBackword') {
      if (currentIndex === 0) {
        await setCurrentSong(songs[last])
        activeSongHandler(songs[last])
      } else {
        await setCurrentSong(songs[currentIndex - 1])
        activeSongHandler(songs[currentIndex - 1])
      }
    }

    if (direction === 'skipForword') {
      if (currentIndex === last) {
        await setCurrentSong(songs[0])
        activeSongHandler(songs[0])
      } else {
        await setCurrentSong(songs[currentIndex + 1])
        activeSongHandler(songs[currentIndex + 1])
      }
    }
    if (isPlaying) audioRef.current.play()
  }

  // ----------------------------------

  return (
    <div className="player">
      {/* ---------------------TIMER------------------- */}
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={inputColor} className="track">
          <input
            onChange={dragHandler}
            min="0"
            max={songInfo.duration || 0}
            type="range"
            value={songInfo.currentTime}
          />
          <div style={inputPercentage} className={`animate-track ${nightMode && 'animate-track-night'}`}></div>
        </div>
        <p>
          {getTime(
            songInfo.duration ? songInfo.duration - songInfo.currentTime : ''
          )}
        </p>
      </div>

      {/* ------------------------CONTROLS-------------------- */}
      <div className={`player-controlls ${nightMode && 'player-controlls-night'}`}>
        {!isMute ? (
          <VolumeUpIcon onClick={muteHandler} />
        ) : (
          <VolumeOffIcon onClick={muteHandler} />
        )}

        <SkipPrevious className={nightMode ? 'svg-click-night':'svg-click'} style={{fontSize: '150%'}} onClick={() => songSkipHandler('skipBackword')} />
        {isPlaying ? (
          <PauseIcon
          className={`pause-btn ${nightMode && 'pause-btn-night'}`}
            style={{ fontSize: '300%'}}
            onClick={playSongHandler}
          />
        ) : (
          <PlayIcon style={{fontSize: '300%' }} onClick={playSongHandler} />
        )}
        <SkipNext  className={nightMode ? 'svg-click-night':'svg-click'} style={{fontSize: '150%'}} onClick={() => songSkipHandler('skipForword')} />
        {loopStatus === 'loopOff' ? (
          <RepeatIcon style={{color: '#ccc' }} onClick={loopHandler} />
        ) : loopStatus === 'loopAll' ? (
          <RepeatIcon style={{color: '#70829B' }} onClick={loopHandler} />
        ) : loopStatus === 'loopOne' ? (
          <RepeatOneIcon style={{color: '#70829B' }} onClick={loopHandler} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Player
