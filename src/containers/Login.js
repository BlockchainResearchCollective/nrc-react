import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../components/LoginForm'
import logo from '../assets/Logo_vector.svg'

const divStyle = {
  width: '80%',
  margin: '0 auto',
}

const logoStyle = {
  width: '80px',
  height: '80px',
  width: '100%',
  margin: 'auto',
  marginTop: '80px',
}

const titleStyle ={
  textTransform: 'uppercase',
  textAlign: 'center',
  color: '#fff',
  fontSize: '16px',
  fontFamily: 'Calibri',
  marginTop: '10px',
  marginBottom: '50px',
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "username_init",
      password: "password_init"
    }
  }

  render() {
    return (
      <div style={divStyle}>
        <img src={logo} style={logoStyle} alt="logo" />
        <p style={titleStyle} >nanyang review chain</p>
        <LoginForm/>
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

}

export default Login