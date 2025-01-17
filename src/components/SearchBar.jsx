/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import { TEXTS } from '../consts'
import '../styles/searchBar.css'
import searchImage from '../assets/search.png'
import crossImage from '../assets/cross.png'

const SearchBar = ({
  hideButton,
  searchText,
  onSearch,
  buttonStyle,
  onClick,
}) => {
  const [text, setText] = useState(searchText || '')

  useEffect(() => setText(searchText), [searchText])

  const onChange = (e) => {
    const regexToTest = /^[a-zA-Z0-9 _.-]*$/ // To avoid errors with react router
    const value = e.target.value
    if(regexToTest.test(value)) {
      setText(value)
      if (onSearch) onSearch({ text: value })
    }
  }

  const cleanInput = () => {
    setText('')
    if (onSearch) onSearch({ text: '' })
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter' && onClick) onClick({ text })
  }

  return (
    <div className="search-bar-general">
      <input
        type="text"
        value={text || ''}
        onChange={onChange}
        className="search-input"
        onKeyDown={handleEnter}
      />
      <img className="search-icon" src={searchImage}></img>
      {text && (
        <img
          className="remove-text-icon"
          src={crossImage}
          onClick={cleanInput}
        ></img>
      )}
      {!hideButton && (
        <button
          style={buttonStyle}
          className="search-button"
          onClick={() => {
            if (onClick) onClick({ text })
          }}
        >
          {TEXTS.SEARCH}
        </button>
      )}
    </div>
  )
}

export default SearchBar
