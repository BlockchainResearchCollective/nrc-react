import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../components/LoginForm'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "username_init",
      password: "password_init"
    }
  }

  render() {
    return (
      <div>
        <p>other display</p>
        <LoginForm/>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

}
