import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import './index.css'

const locationList = [
  {id: 'Hyd', text: 'Hyderabad'},
  {id: 'delhi', text: 'Delhi'},
]
const FilterNav = props => {
  const {
    changeSearchInput,
    getJobs,
    searchInput,
    changeEmployeeList,
    employmentTypesList,
    salaryRangesList,
    changeSalary,
    changeLocation,
  } = props
  console.log(employmentTypesList)

  const onChangeSearchInput = event => {
    changeSearchInput(event)
  }

  const onEnter = event => {
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => (
    <div className="search-input-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnter}
        value={searchInput}
      />
      <button
        className="search-btn"
        data-testid="searchButton"
        type="button"
        onClick={getJobs}
        aria-label="save"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const onSelectEmployeeType = event => {
    changeEmployeeList(event.target.value)
  }

  const renderEmploymentInputs = () => (
    <div className="employee-checkbox-container">
      <h1>Type of Employment</h1>
      <ul className="checkbox-container">
        {employmentTypesList.map(eachItem => (
          <li className="li-checkbox" key={eachItem.employmentTypeId}>
            <input
              id={eachItem.employmentTypeId}
              onChange={onSelectEmployeeType}
              type="checkbox"
              className="check-input"
              value={eachItem.employmentTypeId}
            />
            <label className="label" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryInputs = () => (
    <div className="checkbox-inputs">
      <h1>Salary Range</h1>
      <ul className="salary-container">
        {salaryRangesList.map(eachObj => {
          const onClickSalary = () => {
            changeSalary(eachObj.salaryRangeId)
          }
          return (
            <li
              className="li-container"
              key={eachObj.salaryRangeId}
              onClick={onClickSalary}
            >
              <input id={eachObj.salaryRangeId} type="radio" name="salary" />
              <label className="label" htmlFor={eachObj.salaryRangeId}>
                {eachObj.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const onSelectLocation = event => {
    changeLocation(event.target.value)
  }

  const renderLocationsInputs = () => (
    <>
      <ul className="locations-list-container">
        {locationList.map(e => (
          <li key={e.id}>
            <input
              id={e.id}
              onChange={onSelectLocation}
              type="checkbox"
              className="check-input"
              value={e.id}
            />
            <label className="label" htmlFor={e.id}>
              {e.text}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filters-container">
      {renderSearchInput()}
      <Profile />
      <hr className="line" />
      {renderEmploymentInputs()}
      <hr className="line" />
      {renderSalaryInputs()}
      <h1>Locations</h1>
      {renderLocationsInputs()}
    </div>
  )
}
export default FilterNav
