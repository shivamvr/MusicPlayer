import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon,faSun } from '@fortawesome/free-solid-svg-icons'
import MenuIcon from '@material-ui/icons/ListRounded'

function Nav({ libraryStatus, setLibraryStatus, nightMode, setNightMode }) {
  const nigthModeHandler = () => {
    setNightMode(!nightMode)
  }
  return (
    <div>
      <nav className={nightMode ? 'nav-night': ''}>
        <h1>
          Wave{' '}
          <span onClick={nigthModeHandler} className="moon">
            <FontAwesomeIcon icon={nightMode ? faSun : faMoon} />
          </span>
        </h1>
        <MenuIcon
          className={nightMode ? 'night-mode' : ''}
          onClick={() => setLibraryStatus(!libraryStatus)}
        ></MenuIcon>
      </nav>
    </div>
  )
}

export default Nav
