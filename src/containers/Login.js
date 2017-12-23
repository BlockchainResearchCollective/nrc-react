import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Steps, Row, Col } from 'antd'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import Banner from '../components/Banner'
import { URL } from '../constants'

const Step = Steps.Step

const divStyle = {
  width: '80%',
  margin: '0 auto',
}

const addMarginTop = (offset) => ({
  marginTop: offset + 'px'
})

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
  fontFamily: 'Open Sans',
  marginTop: '10px',
  marginBottom: '50px',
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: "loginPage",
      step: 0
    }
  }

  handleForgetPassword = (e) => {
    e.preventDefault()
    this.setState({
      display: "forgetPasswordPage"
    })
  }

  handleSignUp = (e) => {
    e.preventDefault()
    this.setState({
      display: "signUpPage"
    })
  }

  render() {
    return (
      <div>
        { this.state.display === "loginPage" &&
          <div style={divStyle}>
            <img src={`${URL}/images/Logo_vector.svg`} style={logoStyle} alt="logo" />
            <p style={titleStyle} >nanyang review chain</p>
            <LoginForm
              handleForgetPassword={this.handleForgetPassword}
              handleSignUp={this.handleSignUp}
            />
          </div>
        }
        { this.state.display === "signUpPage" &&
          <div>
            <Row style={addMarginTop(50)}>
              <Col span={16} offset={4}>
                <Banner title="Nanyang Review Chain"/>
              </Col>
            </Row>
            <Row style={addMarginTop(40)}>
              <Col span={20} offset={2}>
                <Steps size="small" current={this.state.step}>
                  <Step title="Information" />
                  <Step title="Activation" />
                </Steps>
              </Col>
            </Row>
            <div style={addMarginTop(80)}>
              <SignUpForm />
            </div>
          </div>
        }
        { this.state.display === "forgetPasswordPage" &&
          <h1>forget password page</h1>
        }
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

}

export default Login
