import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { message } from 'antd'
import Login from './containers/Login'
import Home from './containers/Home'
import './App.css'
import { checkLoginStatus } from './actions/user'
import { clearMessage } from './actions/system'

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
      this.props.dispatch(clearMessage())
    }
  }

  componentWillMount() {
    this.props.dispatch(checkLoginStatus())
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
          <Home />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    userIsFetching: state.user.isFetching,
    message: state.system.message
  }
}

export default connect(mapStateToProps)(App)
