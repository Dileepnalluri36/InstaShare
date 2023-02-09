import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import SearchContext from './context/SearchContext'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {
    searchText: '',
    searchPosts: [],
    isSearchButtonClicked: false,
    setLoading: false,
    isFailure: false,
  }

  upDateSearchText = value => {
    this.setState({searchText: value})
  }

  resetSearchButton = () => {
    this.setState({
      isSearchButtonClicked: false,
    })
  }

  resetFailure = () => {
    this.setState({isFailure: false})
  }

  setFailure = () => {
    this.setState({isFailure: true})
  }

  setSearchButton = () => {
    this.setState({
      isSearchButtonClicked: true,
    })
  }

  updateLoading = () => {
    this.setState(prevState => ({setLoading: !prevState.setLoading}))
  }

  setPostsData = updatedData => {
    this.setState({searchPosts: updatedData})
  }

  initiateSearchPostLikeApi = async (postId, likeStatus) => {
    const {searchPosts} = this.state
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
    let userPostsData = searchPosts
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
    this.setState({searchPosts: userPostsData})
  }

  render() {
    const {
      searchText,
      searchPosts,
      isSearchButtonClicked,
      setLoading,
      isFailure,
    } = this.state
    return (
      <SearchContext.Provider
        value={{
          searchText,
          isSearchButtonClicked,
          upDateSearchText: this.upDateSearchText,
          resetSearchButton: this.resetSearchButton,
          setLoading,
          searchPosts,
          setSearchButton: this.setSearchButton,
          updateLoading: this.updateLoading,
          setPostsData: this.setPostsData,
          setFailure: this.setFailure,
          resetFailure: this.resetFailure,
          isFailure,
          initiateSearchPostLikeApi: this.initiateSearchPostLikeApi,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}
export default App
