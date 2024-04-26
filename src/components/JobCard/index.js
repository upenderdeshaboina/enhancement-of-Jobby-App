import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {details} = props
  const {
    companyLogo,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packageAnnum,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="card-link">
      <li className="li-container" id={id}>
        <div className="card-cotainer">
          <div className="img-container">
            <img src={companyLogo} alt="company logo" className="card-logo" />
            <div className="text-container">
              <h1 className="card-heading">{title}</h1>
              <div className="star-icon">
                <AiFillStar color="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package">
            <div className="loaction-jobtype">
              <div className="icon-container">
                <MdLocationOn color="#fff" />
                <p className="rating">{location}</p>
              </div>
              <div className="icon-container">
                <BsBriefcaseFill color="#fff" />
                <p className="rating">{employmentType}</p>
              </div>
              <p className="package">{packageAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="description-container">
            <h1 className="description-heading">Description</h1>
            <p className="description">{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
