import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'
import './index.css'

class Home extends Component {
  state = {apiStatus: ''}

  render() {
    return (
      <div className="home_container">
        <Header />
        <UserStories />
      </div>
    )
  }
}
export default Home
