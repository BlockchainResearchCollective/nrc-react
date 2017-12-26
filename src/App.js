import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import Login from './containers/Login'
import Home from './containers/Home'
import './App.css'
import { checkLoginStatus } from './actions'

const divStyle = {
  overflowY: 'scroll',
  height: '100%'
}

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
      <div style={divStyle}>
        { !this.props.loggedIn &&
          <Login />
        }
        { this.props.loggedIn &&
          <Home
            profile={this.props.profile}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    profile: state.user.profile,
    isFetching: state.user.isFetching
  }
}

export default connect(mapStateToProps)(App)
