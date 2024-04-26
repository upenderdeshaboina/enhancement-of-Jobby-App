import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'
import Header from '../Header'
import FilterNav from '../FilterNav'
import './index.css'

const allJobConstents = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsData: [],
    searchValue: '',
    employeeTypeList: [],
    salaryRange: '',
    jobStatus: allJobConstents.initial,
    location: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({jobStatus: allJobConstents.inProgress})
    const {employeeTypeList, salaryRange, searchValue} = this.state
    console.log(employeeTypeList)
    const jobType = employeeTypeList.join(',')
    console.log(jobType)
    const url = `https://apis.ccbp.in/jobs?employment_type=${jobType}&minimum_package=${salaryRange}&search=${searchValue}`
    const jwt = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      const updatedData = responseData.jobs.map(eachObj => ({
        companyLogo: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        package: eachObj.package_per_annum,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.setState({jobsData: updatedData, jobStatus: allJobConstents.success})
    } else {
      this.setState({jobStatus: allJobConstents.failure})
    }
  }

  searchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onCheckboxInputs = employmentTypeId => {
    const {employeeTypeList} = this.state
    if (employeeTypeList.includes(employmentTypeId)) {
      const updatedList = employeeTypeList.filter(
        eachItem => eachItem !== eachItem.employmentTypeId,
      )
      this.setState({employeeTypeList: updatedList}, this.getJobsData)
    } else {
      this.setState(
        prev => ({
          employeeTypeList: [...prev.employeeTypeList, employmentTypeId],
        }),
        this.getJobsData,
      )
    }
  }

  renderEmploymentInputs = () => (
    <ul className="checkbox-container">
      {employmentTypesList.map(eachItem => (
        <li className="li-checkbox" key={eachItem.employmentTypeId}>
          <input
            id={eachItem.employmentTypeId}
            onChange={this.onCheckboxInputs}
            type="checkbox"
            className="input"
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onChangeSalaryRange = salaryRangeId => {
    this.setState({salaryRange: salaryRangeId}, this.getJobsData)
  }

  renderJobSuccessView = () => {
    const {jobsData} = this.state
    const isTrue = jobsData.length > 0
    return isTrue ? (
      <>
        <ul className="jobs-list">
          {jobsData.map(eachJob => (
            <JobCard details={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No jobs found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onClickJobApi = () => this.getJobsData()

  renderJobFailureView = () => (
    <>
      <div className="jobs-failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-failure-img"
        />
        <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
        <p className="job-failure-description">
          We cannot seem to find the page you are looking for
        </p>
        <div className="failure-text">
          <button
            className="job-failure-btn"
            type="button"
            onClick={this.onClickJobApi}
          >
            Retry
          </button>
        </div>
      </div>
    </>
  )

  renderJobsViews = () => {
    const {jobStatus} = this.state
    switch (jobStatus) {
      case allJobConstents.success:
        return this.renderJobSuccessView()
      case allJobConstents.inProgress:
        return this.renderLoaderView()
      case allJobConstents.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  searchInput = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearch = () => this.getJobsData()

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  changeLocation = locationId => {
    this.setState({location: locationId})
  }

  render() {
    const {searchValue, location} = this.state
    console.log(location)
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="responsive-jobs-container">
            <FilterNav
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.searchInput}
              searchInput={searchValue}
              getJobs={this.getJobsData}
              changeSalary={this.onChangeSalaryRange}
              changeEmployeeList={this.onCheckboxInputs}
              changeLocation={this.changeLocation}
            />
            <div className="search-input-jobs-container">
              <div className="search-container-lg">
                <input
                  className="sm-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.searchInput}
                  onKeyDown={this.onEnterSearchInput}
                  value={searchValue}
                />
                <button
                  className="search-btn"
                  type="button"
                  onClick={this.onClickSearch}
                  aria-label="save"
                >
                  <BsSearch />
                </button>
              </div>
              {this.renderJobsViews()}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
