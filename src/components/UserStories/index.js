/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserStories extends Component {
  state = {apiStatus: apiStatusConstants.initial, storiesList: []}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/stories`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachStory => ({
        userName: eachStory.user_name,
        userId: eachStory.user_id,
        storyUrl: eachStory.story_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        storiesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="user-story-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {storiesList} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="slider-container">
        <Slider {...settings}>
          {storiesList.map(eachStory => (
            <li key={eachStory.userId} className="story_container">
              <img
                className="storyImg"
                alt="user story"
                src={eachStory.storyUrl}
              />
              <p className="userName">{eachStory.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure_view_container">
      <img
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
        className="user_story_failure_img"
      />
      <h1 className="failure_heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={() => this.getUserStories()}
        type="submit"
        className="failure-button"
      >
        Try Again
      </button>
    </div>
  )

  renderUserStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user_stories_container">{this.renderUserStories()}</div>
    )
  }
}

export default UserStories
