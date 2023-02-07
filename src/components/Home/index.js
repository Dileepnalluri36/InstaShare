import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {apiStatus: ''}

  render() {
    return (
      <div className="home_container">
        <Header />
      </div>
    )
  }
}
export default Home
