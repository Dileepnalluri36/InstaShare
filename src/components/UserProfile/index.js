/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MyProfile extends Component {
  state = {apiStatus: apiStatusConstants.initial, myProfileData: []}

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(match)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.user_details)
      const updatedData = {
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        id: data.user_details.id,
        posts: data.user_details.posts,
        postsCount: data.user_details.posts_count,
        profilePic: data.user_details.profile_pic,
        stories: data.user_details.stories,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        userBio: data.user_details.user_bio,
      }
      console.log(updatedData)
      this.setState({
        myProfileData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {myProfileData} = this.state
    const {
      followersCount,
      followingCount,
      id,
      userBio,
      userId,
      userName,
      stories,
      posts,
      postsCount,
      profilePic,
    } = myProfileData
    return (
      <div className="main_container">
        <div className="user_profile_large_container">
          <img src={profilePic} alt="user profile" className="userProfilePic" />
          <div className="user_profile_div">
            <h1 className="userProfileName">{userName}</h1>
            <div className="count_div">
              <p className="text">
                <span className="count">{postsCount} </span>
                posts
              </p>
              <p className="text">
                <span className="count">{followersCount} </span>
                followers
              </p>
              <p className="text">
                <span className="count">{followingCount} </span>
                following
              </p>
            </div>
            <p className="user_profile_user_id">{userId}</p>
            <p className="user_profile_bioText">{userBio}</p>
          </div>
        </div>
        <ul className="user_profile_stories_container">
          {stories.map(eachStory => (
            <li key={eachStory.id}>
              <img
                src={eachStory.image}
                alt="user story"
                className="storyImg"
              />
            </li>
          ))}
        </ul>
        <div className="posts_heading_div">
          <BsGrid3X3 className="gridIcon" />
          <h1 className="posts_heading">Posts</h1>
        </div>
        {posts.length > 0 ? (
          <ul className="user_profile_posts_container">
            {posts.map(eachPost => (
              <li key={eachPost.id}>
                <img
                  src={eachPost.image}
                  alt="user post"
                  className="user_profile_post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="user_profile_no_post_div">
            <BiCamera className="cameraIcon" />
            <h1 className="no_posts_heading">No Posts Yet</h1>
          </div>
        )}
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="user-story-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_view_container">
      <img
        className="user_profile_failure_img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675454266/HomeFaillureImg_qz05si.png"
        alt="failure view"
      />
      <p className="failure_heading">Something went wrong. Please try again</p>
      <button
        onClick={() => this.getUserProfileData()}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  renderUserProfile = () => {
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
      <div className="my_profile_container">
        <Header />
        {this.renderUserProfile()}
      </div>
    )
  }
}
export default MyProfile
