import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const allConstents = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Profile extends Component {
  state = {profileData: {}, apiStatus: allConstents.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: allConstents.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      const obj = {
        profileImg: jsonData.profile_details.profile_image_url,
        name: jsonData.profile_details.name,
        shortBio: jsonData.profile_details.short_bio,
      }
      this.setState({apiStatus: allConstents.success, profileData: obj})
    } else {
      this.setState({apiStatus: allConstents.failure})
    }
  }

  profileSuccessView = () => {
    const {profileData} = this.state
    console.log(profileData)
    const {profileImg, name, shortBio} = profileData
    return (
      <>
        <div className="profile-bg">
          <img src={profileImg} className="profile-logo" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="bio">{shortBio}</p>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <h1>profile Fail</h1>
      <button
        className="failure-btn"
        type="button"
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </>
  )

  renderProFileViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case allConstents.success:
        return this.profileSuccessView()
      case allConstents.inProgress:
        return this.renderLoaderView()
      case allConstents.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProFileViews()}</>
  }
}
export default Profile
