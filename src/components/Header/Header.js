import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className="header-nav">
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            className="nav-link"
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className="header-nav">
        <Link to='/login' className="nav-link">Login</Link>
        {' '}
        <Link to='/register' className="nav-link">Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="main-header">
        <h1 className="app-name">
          <Link to='/'>
            Lang-Learn
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
