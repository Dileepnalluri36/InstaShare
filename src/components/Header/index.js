/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unknown-property */
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {IoCloseCircle} from 'react-icons/io5'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const [isOpen, setHamburgerButton] = useState(false)
  const [searchBarVisible, setShowSearchBar] = useState(false)

  const showSearchBar = () => {
    setShowSearchBar(!searchBarVisible)
  }

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header_container">
      <div className="large_container">
        <div className="title_div">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
              className="login-website-logo-image"
              alt="website logo"
            />
          </Link>
          <h1 className="title_heading">Insta Share</h1>
        </div>

        <div className="links_search_div">
          <div className="search_div">
            <input
              className="searchBar"
              type="search"
              placeholder="Search Caption"
            />
            <button className="searchButton" type="button" testid="searchIcon">
              <FaSearch className="searchIcon" />
            </button>
          </div>
          <ul className="nav_bar">
            <Link to="/" className="nav_item">
              <li>Home</li>
            </Link>
            <Link to="/my-profile" className="nav_item">
              <li>Profile</li>
            </Link>
          </ul>
          <button
            onClick={onClickLogout}
            type="button"
            className="logout_button"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mobile_container">
        <div className="top_div">
          <div className="title_div">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
                className="login-website-logo-image"
                alt="website logo"
              />
            </Link>
            <h1 className="title_heading">Insta Share</h1>
          </div>
          <button
            onClick={() => setHamburgerButton(!isOpen)}
            testid="hamburgerIcon"
            className="hamburgerButton"
            type="button"
          >
            <GiHamburgerMenu className="hamburgerIcon" />
          </button>
        </div>
        {isOpen && (
          <div className="links_div">
            <ul className="nav_bar">
              <Link to="/" className="nav_item">
                <li>Home</li>
              </Link>
              <Link to="/my-profile" className="nav_item">
                <li>Profile</li>
              </Link>
              <li onClick={showSearchBar}>Search</li>
            </ul>
            <button
              onClick={onClickLogout}
              type="button"
              className="logout_button"
            >
              Logout
            </button>
            <button
              onClick={() => setHamburgerButton(!isOpen)}
              type="button"
              className="hamburgerButton"
            >
              <IoCloseCircle className="hamburgerIcon" />
            </button>
          </div>
        )}
        {searchBarVisible && (
          <div className="search_div">
            <input
              className="searchBar"
              type="search"
              placeholder="Search Caption"
            />
            <button className="searchButton" type="button" testid="searchIcon">
              <FaSearch className="searchIcon" />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
export default withRouter(Header)
