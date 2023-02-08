import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'
import './index.css'
import UserPosts from '../UserPosts'

class Home extends Component {
  render() {
    return (
      <div className="home_container">
        <Header />
        <UserStories />
        <UserPosts />
      </div>
    )
  }
}
export default Home
