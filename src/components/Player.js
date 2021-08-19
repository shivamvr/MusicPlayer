import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons'
function Player({isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, currentSong, setCurrentSong, songs, setSongs}) {
    
    const inputPercentage = {
        transform:`translateX(${songInfo.animationPrecentage}%)`
    }
    
    const inputColor = {
     background: `linear-gradient(to right, ${currentSong.color[0]} , ${currentSong.color[1]})`
    }
    
    // -----------FUNCTIONS------------- 
    const playSongHandler = ()=>{
        if(isPlaying){
            setIsPlaying(!isPlaying)
            audioRef.current.pause()
        }else{
            setIsPlaying(!isPlaying)
            audioRef.current.play()
        }
    }

    const getTime = (time) =>{
     return ( Math.floor(time/60) + ':' + ('0'+Math.floor(time%60)).slice(-2) )
    }

    const dragHandler =(e)=>{
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    
    
    const songSkipHandler = async (direction) =>{
        const currentIndex = songs.findIndex((song)=> song.id === currentSong.id)
        const last = (songs.length) - 1
        if(direction === 'skipBackword'){
            if(currentIndex === 0){
               await setCurrentSong(songs[last])
            }else{
               await setCurrentSong(songs[currentIndex - 1])
            }
        }
        
        if(direction === 'skipForword'){
            if(currentIndex === last){
               await setCurrentSong(songs[0])
            }else{
               await setCurrentSong(songs[currentIndex + 1])
            }
       }
       if(isPlaying) audioRef.current.play()

    }

    useEffect(()=>{
        const newSongs = songs.map((newSong) => {
          if (newSong.id === currentSong.id) {
            return { ...newSong, active: true }
          } else {
            return { ...newSong, active: false }
          }
        })
        setSongs(newSongs)
        
        if(isPlaying) audioRef.current.play()

    },[currentSong])
    // ---------------------------------- 

    return (
        <div className='player'>
              {/* ---------------------TIMER------------------- */}
            <div className='time-control'> 
            <p>{getTime(songInfo.currentTime)}</p>
            <div style={inputColor} className="track">
            <input onChange={dragHandler} min='0' max={songInfo.duration || 0} type="range" value={songInfo.currentTime}/>
             <div style={inputPercentage} className="animate-track"></div>
            </div>
            <p>{getTime( songInfo.duration ? songInfo.duration-songInfo.currentTime: '')}</p>
            </div>

            {/* ------------------------CONTROLS-------------------- */}
            <div className='player-controlls'>
            <FontAwesomeIcon onClick={()=>songSkipHandler('skipBackword')} className='prev' size='2x' icon={faAngleLeft}/>
            <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay}/>
            <FontAwesomeIcon onClick={()=>songSkipHandler('skipForword')} className='next' size='2x' icon={faAngleRight}/>
            </div>
        </div>
    )
}

export default Player
