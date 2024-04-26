import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import './index.css'

const constents = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetailsView extends Component {
  state = {jobCardData: {}, similarJobsData: [], apiStatus: constents.initial}

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({apiStatus: constents.inProgress})
    const jwt = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      const updatedObj = {
        jobDetails: jsonData.job_details,
        similarJobs: jsonData.similar_jobs,
      }
      const detailedJob = {
        companyLogo: updatedObj.jobDetails.company_logo_url,
        companyWebsite: updatedObj.jobDetails.company_website_url,
        employmentType: updatedObj.jobDetails.employment_type,
        id: updatedObj.jobDetails.id,
        jobDescription: updatedObj.jobDetails.job_description,
        skills: updatedObj.jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: updatedObj.jobDetails.life_at_company.description,
          lifeImg: updatedObj.jobDetails.life_at_company.image_url,
        },
        location: updatedObj.jobDetails.location,
        packagePerAnnum: updatedObj.jobDetails.package_per_annum,
        rating: updatedObj.jobDetails.rating,
        title: updatedObj.jobDetails.title,
      }

      const similar = updatedObj.similarJobs.map(eachItem => ({
        similarJobLogo: eachItem.company_logo_url,
        similarJobEmployType: eachItem.employment_type,
        similarJobId: eachItem.id,
        similarJobDescription: eachItem.job_description,
        similarJobLocation: eachItem.location,
        similarJobRating: eachItem.rating,
        similarJobTitle: eachItem.title,
      }))

      this.setState({
        apiStatus: constents.success,
        jobCardData: detailedJob,
        similarJobsData: similar,
      })
    } else {
      this.setState({apiStatus: constents.failure})
    }
  }

  onClickGetApi = () => {
    this.getJobData()
  }

  renderFailureView = () => (
    <div className="detailed-job-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="detailed-img"
        alt="failure view"
      />
      <h1 className="detailed-failed-heading">Oops! Something Went Wrong</h1>
      <p className="detialed=failed-description">
        We cannot Seem to find the page you are looking for
      </p>
      <div className="failure-btn-container">
        <button
          className="failure-button"
          type="button"
          onClick={this.onClickGetApi}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobCardData, similarJobsData} = this.state
    const {
      companyLogo,
      companyWebsite,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      title,
      rating,
    } = jobCardData
    return (
      <>
        <div className="container">
          <div className="top-part-container">
            <div className="image-name-container">
              <img
                src={companyLogo}
                alt=" job details company logo"
                className="job-img"
              />
              <h1 className="title">{title}</h1>
              <div className="text-container">
                <div className="rating-container">
                  <AiFillStar />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>

            <div className="location-container">
              <div className="location-job">
                <div className="icon-container">
                  <MdLocationOn color="ffffff" />
                  <p className="icon-text">{location}</p>
                </div>
                <div className="icon-container">
                  <BsBriefcaseFill color="#fff" />
                  <p className="job-type">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="second-part-container">
            <div className="web-link-container">
              <h1 className="headings">Description</h1>
              <div className="anchor-link">
                <a href={companyWebsite} className="website-link">
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="description">{jobDescription}</p>
            </div>
            <h1 className="headings">Skills</h1>
            <ul className="skils-container">
              {skills.map(eachItem => (
                <li className="skill-li" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill"
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-at-life-container">
              <div className="life-heading-container">
                <h1 className="headings">Life at Company</h1>
                <p className="life-company-description">
                  {lifeAtCompany.description}
                </p>
              </div>
              <img
                src={lifeAtCompany.lifeImg}
                alt="life at company"
                className="life-img"
              />
            </div>
          </div>
        </div>
        <h1 className="headings">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsData.map(eachItem => (
            <SimilarJob
              key={eachItem.similarJobId}
              details={eachItem}
              employmentType={employmentType}
            />
          ))}
        </ul>
      </>
    )
  }

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constents.success:
        return this.renderSuccessView()
      case constents.failure:
        return this.renderFailureView()
      case constents.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="job-detailed-container">{this.renderAllView()}</div>
      </>
    )
  }
}
export default JobDetailsView
