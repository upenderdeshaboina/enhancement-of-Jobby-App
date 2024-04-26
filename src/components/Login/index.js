import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorActive: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSucess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = err => {
    this.setState({errorActive: true, errorMsg: err})
  }

  submmitingForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const data = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    console.log(response)
    const jsonData = await response.json()
    if (response.ok) {
      // console.log(jsonData)
      this.onSubmitSucess(jsonData.jwt_token)
    } else {
      this.onSubmitFailure(jsonData.error_msg)
    }
  }

  render() {
    const {username, password, errorActive, errorMsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.submmitingForm}>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              value={username}
              onChange={this.onChangeUserName}
              id="username"
              placeholder="username"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={this.onChangePassword}
              id="password"
              placeholder="password"
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
          {errorActive && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
