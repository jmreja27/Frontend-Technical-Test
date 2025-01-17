/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import '../styles/resultsPage.css'
import getData from '../Faker'
import ImageResult from '../components/ImageResult'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { TEXTS } from '../consts'
import googleImage from '../assets/google.png'
import settingsImage from '../assets/settings.png'
import profileImage from '../assets/profile.png'

const inputClass = 'search-input-results-page'
const imageClass = 'image-result'
const NUM_DUMMY_CONTENT = 10
const loadingDummyContent = Array.from({ length: NUM_DUMMY_CONTENT })

const ResultsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { searchText } = useParams()
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(!!searchText)
  const [image, setImage] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const setData = async () => {
      setImage(null)
      if (searchText) {
        const data = await getData()
        const matchItems = data.filter((item) => {
          const formatSearchText = searchText.toLowerCase()
          const type = item.type?.toLowerCase()
          const title = item.title?.toLowerCase()
          return (
            type.includes(formatSearchText) || title.includes(formatSearchText)
          )
        })
        setResults(matchItems)
        setIsSearching(true)
      } else {
        setImage(null)
        setIsSearching(false)
      }
      setLoaded(true)
    }
    setTimeout(() => {
      setData()
    }, 500)
  }, [searchText])

  const onKeyEnter = ({ text }) => {
    const url = location.pathname.replace(/^\/search(\/.*)?/, `/search/${text}`)
    if (location.pathname !== url) navigate(url)
  }

  const returnHome = () => {
    const url = location.pathname.replace(`/search/${searchText}`, '/')
    navigate(url)
  }

  return (
    <>
      <header className={image ? 'dark-background' : ''}>
        <div className="header-left search-results-page">
          <img
            onClick={returnHome}
            src={googleImage}
            className="image-google-results"
          ></img>
          <SearchBar
            inputClass={inputClass}
            searchText={searchText || ''}
            hideButton={true}
            onClick={onKeyEnter}
          />
        </div>
        <div className="header-right search-results-page">
          <img
            className="settings-results-page"
            src={settingsImage}
          ></img>
                    <img
            className="profile-results-page"
            src={profileImage}
          ></img>
        </div>
      </header>
      <div className='results-page'>
      {loaded && !isSearching && (
        <div className="search-no-text">
          <p>
            {TEXTS.TRY_LOOKING} <b>{TEXTS.RESULTS_EXAMPLE}</b>
          </p>
        </div>
      )}
      {!loaded && (
        <div className="search-results">
          {loadingDummyContent.map((item, index) => {
            return (
              <div className="loading-content" key={index}>
                <div className="rectangle-loading-s"></div>
                <div className="rectangle-loading-m"></div>
                <div className="rectangle-loading-l"></div>
              </div>
            )
          })}
        </div>
      )}
      {loaded && isSearching && results?.length > 0 && (
        <div className="search-results">
          {results?.map((result, index) => {
            return (
              <div className="individual-result" key={index}>
                <p>{result.url}</p>
                <p onClick={() => setImage(result)} className="search-title">
                  {result.title}
                </p>
                <p>{result.description}</p>
              </div>
            )
          })}
        </div>
      )}
      {loaded && isSearching && results?.length < 1 && (
        <div className="search-no-results">
          <p>
            {TEXTS.NO_RESULTS} '<b>{searchText}</b>'
          </p>
          <p>
            {TEXTS.TRY_LOOKING} <b>{TEXTS.RESULTS_EXAMPLE}</b>
          </p>
        </div>
      )}
      {image && <ImageResult classes={imageClass} result={image}></ImageResult>}
      </div>
      <footer className={image ? 'dark-background' : ''}>
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

export default ResultsPage
