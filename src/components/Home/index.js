import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="heading">
            Find The Job That <br /> Fits Your Life
          </h1>
          <p className="description">
            Millions of people are searching for jobs, salary <br />
            information, company reviews. Find the job that fits your <br />
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button
              className="find-jobs-btn"
              type="button"
              onClick={this.onClickFindJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}
export default Home
