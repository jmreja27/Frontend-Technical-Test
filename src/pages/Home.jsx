/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import '../styles/homepage.css'
import { useNavigate } from 'react-router-dom'
import { TEXTS } from '../consts'
import googleImage from '../assets/google.png'
import settingsImage from '../assets/settings.png'
import profileImage from '../assets/profile.png'

const Homepage = () => {
  const navigate = useNavigate()
  const [buttonStyle, setButtonStyle] = useState({
    opacity: 0.1,
    cursor: 'unset',
  })

  const onSearch = ({ text }) =>
    setButtonStyle(
      text
        ? { opacity: 1, cursor: 'pointer' }
        : { opacity: 0.1, cursor: 'unset' }
    )

  const onClick = ({ text }) => {
    if (text) navigate(`/search/${text}`)
  }

  return (
    <>
      <header>
        <div className="header-left">
          <p className="header-left-text">
            <b>{TEXTS.AGILE_BOLD_HEADER}</b> {TEXTS.AGILE_SIMPLE_HEADER}
          </p>
        </div>
        <div className="header-right">
          <img
            className="profile-homepage"
            src={profileImage}
          ></img>
          <img
            className="settings-homepage"
            src={settingsImage}
          ></img>
        </div>
      </header>
      <div className="search-homepage">
        <img className="homepage-image" src={googleImage}></img>
        <SearchBar
          buttonStyle={buttonStyle}
          onSearch={onSearch}
          onClick={onClick}
        ></SearchBar>
      </div>
      <footer>
        <div className="footer-left">
          <p className="footer-left-text">{TEXTS.GOOGLE_FOOTER}</p>
        </div>
        <div className="footer-right">
          <p className="footer-right-text">{TEXTS.VERSION_FOOTER}</p>
        </div>
      </footer>
    </>
  )
}

export default Homepage
