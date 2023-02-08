/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import SearchContext from '../../context/SearchContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {apiStatus: apiStatusConstants.initial, postsData: []}

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

  renderSearchPosts = postsData => (
    <>
      <ul className="posts_list_container">
        <h1 className="searchResultsHeading">Search Results</h1>
        {postsData.map(eachPost => {
          const {comments} = eachPost
          const updatedComments = comments.map(eachComment => ({
            comment: eachComment.comment,
            commentUserId: eachComment.user_id,
            commentUserName: eachComment.user_name,
          }))

          return (
            <li key={eachPost.postId} className="post_item_container">
              <div className="profile_div">
                <img
                  src={eachPost.profilePic}
                  alt="post author profile"
                  className="profile_pic"
                />
                <p className="profileName">{eachPost.userName}</p>
              </div>
              <img src={eachPost.postImage} alt="post" className="postImage" />
              <div className="social_div">
                <button testid="likeIcon" type="button" className="icon_button">
                  <BsHeart className="icon" />
                </button>
                <button
                  testid="commentIcon"
                  type="button"
                  className="icon_button"
                >
                  <FaRegComment className="icon" />
                </button>
                <button
                  testid="shareIcon"
                  type="button"
                  className="icon_button"
                >
                  <BiShareAlt className="icon" />
                </button>
              </div>
              <p className="likes">{eachPost.likesCount} likes</p>
              <p className="caption">{eachPost.postCaption}</p>
              <ul className="comments_container">
                {updatedComments.map(eachComment => (
                  <li className="comment_item" key={eachComment.commentUserId}>
                    <span className="commentUSerName">
                      {eachComment.commentUserName}
                    </span>
                    <p className="comment">{eachComment.comment}</p>
                  </li>
                ))}
              </ul>
              <p className="createdAt">{eachPost.createdAt}</p>
            </li>
          )
        })}
      </ul>
    </>
  )

  renderSuccessView = () => {
    const {postsData} = this.state
    return (
      <ul className="posts_list_container">
        {postsData.map(eachPost => {
          const {comments} = eachPost
          const updatedComments = comments.map(eachComment => ({
            comment: eachComment.comment,
            commentUserId: eachComment.user_id,
            commentUserName: eachComment.user_name,
          }))

          return (
            <li key={eachPost.postId} className="post_item_container">
              <div className="profile_div">
                <img
                  src={eachPost.profilePic}
                  alt="post author profile"
                  className="profile_pic"
                />
                <p className="profileName">{eachPost.userName}</p>
              </div>
              <img src={eachPost.postImage} alt="post" className="postImage" />
              <div className="social_div">
                <button testid="likeIcon" type="button" className="icon_button">
                  <BsHeart className="icon" />
                </button>
                <button
                  testid="commentIcon"
                  type="button"
                  className="icon_button"
                >
                  <FaRegComment className="icon" />
                </button>
                <button
                  testid="shareIcon"
                  type="button"
                  className="icon_button"
                >
                  <BiShareAlt className="icon" />
                </button>
              </div>
              <p className="likes">{eachPost.likesCount} likes</p>
              <p className="caption">{eachPost.postCaption}</p>
              <ul className="comments_container">
                {updatedComments.map(eachComment => (
                  <li className="comment_item" key={eachComment.commentUserId}>
                    <span className="commentUSerName">
                      {eachComment.commentUserName}
                    </span>
                    <p className="comment">{eachComment.comment}</p>
                  </li>
                ))}
              </ul>
              <p className="createdAt">{eachPost.createdAt}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  renderConditionForSearchResults = (
    isFailure,
    isSearchButtonClicked,
    postsData,
  ) => {
    if (!isFailure && isSearchButtonClicked) {
      if (postsData.length > 0) {
        return this.renderSearchPosts(postsData)
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
            postsData,
            isFailure,
          } = value

          return (
            <div className="posts-container">
              {searchText === '' && this.renderUserPosts()}
              {setLoading && this.renderLoadingView()}
              {this.renderConditionForSearchResults(
                isFailure,
                isSearchButtonClicked,
                postsData,
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
