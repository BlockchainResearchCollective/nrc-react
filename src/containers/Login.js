import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Steps, Row, Col, Icon } from 'antd'
import { signUp, checkLoginStatus } from '../actions'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'
import SignUpActivation from '../components/SignUpActivation'
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

  handleSignUpSubmit = (e, values) => {
    const { dispatch } = this.props
    if (values){
      dispatch(signUp(values.username, values.email, values.password, signUpStatus => {
        if (signUpStatus){
          this.setState({
            step: 1
          })
        }
      }))
    }
  }

  handleBack = (e) => {
    e.preventDefault()
    this.setState({
      display: "loginPage",
      step: 0
    })
    const { dispatch } = this.props
    dispatch(checkLoginStatus())
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
            <Row style={addMarginTop(20)}>
              <Col offset={2}>
                <a onClick={this.handleBack} href="#" style={{textDecoration: 'none'}}><Icon type="left" />Back</a>
              </Col>
            </Row>
            <Row style={addMarginTop(30)}>
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
            { this.state.step === 0 &&
              <div style={addMarginTop(70)}>
                <SignUpForm handleSignUpSubmit={this.handleSignUpSubmit}/>
              </div>
            }
            { this.state.step === 1 &&
              <div style={addMarginTop(100)}>
                <SignUpActivation />
              </div>
            }
          </div>
        }
        { this.state.display === "forgetPasswordPage" &&
          <div>
            <Row style={addMarginTop(20)}>
              <Col offset={2}>
                <a onClick={this.handleBack} href="#" style={{textDecoration: 'none'}}><Icon type="left" />Back</a>
              </Col>
            </Row>
            <h1>forget password page</h1>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

}

export default connect()(Login)
