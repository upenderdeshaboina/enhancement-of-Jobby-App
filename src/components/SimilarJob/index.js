import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJob = props => {
  const {details} = props
  const {
    similarJobLogo,
    similarJobEmployType,
    similarJobDescription,
    similarJobLocation,
    similarJobRating,
    similarJobTitle,
  } = details
  return (
    <li className="similar-job-item">
      <div className="logo-title-location-container">
        <div className="logo-title-container">
          <img
            src={similarJobLogo}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-rating-container">
            <h1 className="title-heading">{similarJobTitle}</h1>
            <div className="rating-container">
              <BsStarFill className="rating-icon" />
              <p className="rating-heading">{similarJobRating}</p>
            </div>
          </div>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{similarJobDescription}</p>
        <div className="location-employee-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-heading">{similarJobLocation}</p>
          </div>
          <div className="employee-type-container">
            <BsFillBriefcaseFill className="brief-case-icon" />
            <p className="employee-type-heading">{similarJobEmployType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJob
