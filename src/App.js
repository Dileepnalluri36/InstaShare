import {Switch, Route} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import SearchContext from './context/SearchContext'
import ProtectedRoute from './components/ProtectedRoute'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import './App.css'

class App extends Component {
  state = {
    searchText: '',
    postsData: [],
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
    this.setState({postsData: updatedData})
  }

  render() {
    const {
      searchText,
      postsData,
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
          postsData,
          setSearchButton: this.setSearchButton,
          updateLoading: this.updateLoading,
          setPostsData: this.setPostsData,
          setFailure: this.setFailure,
          resetFailure: this.resetFailure,
          isFailure,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
        </Switch>
      </SearchContext.Provider>
    )
  }
}
export default App
