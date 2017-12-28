import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { message } from 'antd'
import Login from './containers/Login'
import Home from './containers/Home'
import './App.css'
import { checkLoginStatus, clearMessage } from './actions'

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

  info = (msg) => {
    if (msg){
      message.info(msg)
      const { dispatch } = this.props
      dispatch(clearMessage())
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(checkLoginStatus())
  }

  componentDidUpdate() {
    this.info(this.props.message)
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
    isFetching: state.user.isFetching,
    message: state.user.message
  }
}

export default connect(mapStateToProps)(App)
