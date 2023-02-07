import {Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const {props_} = props
  return (
    <nav className="header_container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dziwdneks/image/upload/v1675419223/login_icon_ekrs85.png"
          className="login-website-logo-image"
          alt="website logo"
        />
      </Link>
    </nav>
  )
}
export default Header
