import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import Login from './containers/Login'
import './App.css'
import { checkLoginStatus } from './actions'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(checkLoginStatus())
  }
  
  render() {
    return (
      <div>
        { !this.props.loggedIn &&
          <Login />
        }
        { this.props.loggedIn &&
          <h1>Login success, in home page now</h1>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    profile: state.user.profile,
    isFetching: state.user.isFetching,
  }
}

export default connect(mapStateToProps)(App)
