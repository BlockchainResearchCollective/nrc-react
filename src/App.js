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
            inProcess={this.props.inProcess}
            storeExist={this.props.storeExist}
            storeOverallScore={this.props.storeOverallScore}
            reviewAmount={this.props.reviewAmount}
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
    userIsFetching: state.user.isFetching,
    message: state.system.message,
    inProcess: state.transaction.inProcess,
    storeExist: state.transaction.storeExist,
    storeOverallScore: state.transaction.storeOverallScore,
    reviewAmount: state.transaction.reviewAmount
  }
}

export default connect(mapStateToProps)(App)
