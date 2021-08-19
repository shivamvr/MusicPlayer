import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMoon, faMusic, faSun} from '@fortawesome/free-solid-svg-icons'

function Nav({libraryStatus, setLibraryStatus, nightMode, setNightMode}) {
    const nigthModeHandler = ()=>{
        setNightMode(!nightMode)
    }
    return (
        <div>
            <nav>
            <h1>Wave <span onClick={nigthModeHandler} className='moon'><FontAwesomeIcon icon={nightMode ? faSun :faMoon}/></span></h1>
            <button className={nightMode ? 'night-mode':''} onClick={()=> setLibraryStatus(!libraryStatus) }>
                 <span>Library</span> 
                <FontAwesomeIcon icon={faMusic} />
            </button>
            </nav>
        </div>
    )
}

export default Nav
