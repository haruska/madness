import React, { Component } from 'react'
import { AppContext } from '../../AppContext'

export default class Home extends Component {
  static contextType = AppContext

  // lifecycle
  componentWillMount() {
    const { router } = this.context
    // authService.loggedIn() ? router.replace('/pools') : router.replace('/login')
    router.replace('/games')
  }

  render() {
    return <div className="home-container">Loading...</div>
  }
}
