/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import SearchContext from '../../context/SearchContext'
import UserPostItem from '../UserPostItem'
import UserPostSearchItem from '../UserPostSearchItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    postsData: [],
    searchPosts: this.props,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.searchPosts !== state.searchPosts) {
      return {
        searchPosts: props.searchPosts,
      }
    }
    return null
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        comments: eachPost.comments,
        userId: eachPost.user_id,
        profilePic: eachPost.profile_pic,
        userName: eachPost.user_name,
        postCaption: eachPost.post_details.caption,
        postImage: eachPost.post_details.image_url,
      }))
      this.setState({
        postsData: updatedData,
        apiStatus: apiStatusConstants.success,
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

  renderFailureView = () => (
    <div className="failure_view_container">
      <img
        className="failure_img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675775097/alert-triangle_cyhzqu.png"
        alt="failure view"
      />
      <p className="failure_heading">Something went wrong. Please try again</p>
      <button
        onClick={() => this.getUserPosts()}
        type="submit"
        className="failure-button"
      >
        Try again
      </button>
    </div>
  )

  noSearchResults = () => (
    <div className="no-results-container">
      <img
        className="no-results-img"
        src="https://res.cloudinary.com/dziwdneks/image/upload/v1675513323/SearchNotFound_ntqrqa.png"
        alt="search not found"
      />
      <h1 className="no-results-heading">Search Not Found</h1>
      <p className="no-results-para">Try different keyword or search again</p>
    </div>
  )

  initiatePostLikeApi = async (postId, likeStatus) => {
    const {postsData} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const likeDetails = {
      like_status: likeStatus,
    }
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    let userPostsData = postsData
    userPostsData = userPostsData.map(eachObject => {
      if (eachObject.postId === postId && likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount + 1,
        }
      }
      if (eachObject.postId === postId && !likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount - 1,
        }
      }

      return eachObject
    })

    this.setState({postsData: userPostsData})
  }

  renderSuccessView = () => {
    const {postsData} = this.state
    console.log(postsData)
    return (
      <ul className="posts_list_container">
        {postsData.map(eachPost => (
          <UserPostItem
            initiatePostLikeApi={this.initiatePostLikeApi}
            eachPost={eachPost}
            key={eachPost.postId}
          />
        ))}
      </ul>
    )
  }

  renderSearchPosts = () => {
    const {searchPosts} = this.state
    return (
      <ul className="posts_list_container">
        <h1 className="searchResultsHeading">Search Results</h1>
        {searchPosts.map(eachPost => (
          <UserPostSearchItem
            initiateSearchPostLikeApi={this.initiateSearchPostLikeApi}
            eachPost={eachPost}
            key={eachPost.postId}
          />
        ))}
      </ul>
    )
  }

  renderConditionForSearchResults = (isFailure, isSearchButtonClicked) => {
    const {searchPosts} = this.state
    if (!isFailure && isSearchButtonClicked) {
      if (searchPosts.length > 0) {
        return this.renderSearchPosts()
      }
      return this.noSearchResults()
    }
    return null
  }

  renderUserPosts = () => {
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
      <SearchContext.Consumer>
        {value => {
          const {
            searchText,
            isSearchButtonClicked,
            setLoading,
            isFailure,
          } = value

          return (
            <div className="posts-container">
              {searchText === '' && this.renderUserPosts()}
              {setLoading && this.renderLoadingView()}
              {this.renderConditionForSearchResults(
                isFailure,
                isSearchButtonClicked,
              )}
              {isFailure && this.renderFailureView()}
            </div>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default UserPosts
