import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <ul className="list-container">
        <li className="logo-container">
          <Link to="/" className="nav-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </li>
        <li className="nav-links-container">
          <Link to="/" className="nav-link">
            <h1 className="link">Home</h1>
            <AiFillHome className="nav-icon" />
          </Link>
          <Link to="/jobs" className="nav-link">
            <p className="link">Jobs</p>
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>
        <li className="nav-button-container">
          <FiLogOut className="icon" onClick={onClickLogout} />
          <button className="logut-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
