import React from 'react'
import { Row, Col, Icon } from 'antd'

const textStyle1 = {
  color: '#fff',
  textAlign: 'center'
}

const textStyle2 = {
  color: '#7f7993',
  marginTop: '70px'
}

const listStyle = {
  listStyle: 'none',
  paddingLeft: 0
}

const iconStyle = {
  margin:'auto 0',
  marginBottom:'30px',
  width:'100%',
  fontSize: 100,
  color: '#fff'
}

const SignUpActivation = (props) => {
  return (
    <div>
      <Icon type='check-circle-o' style={iconStyle} />
      <Row>
        <Col span={12} offset={6}>
          <p style={textStyle1}> A confirmation email has been sent to your email address. </p>
        </Col>
      </Row>
      <Row>
        <Col span={16} offset={5}>
          <div style={textStyle2}>
            <p> Have not received the email? </p>
            <ul style={listStyle}>
              <li> 1. Click here to reenter email address </li>
              <li> 2. Check your junk mail box. </li>
              <li> 3. Try to resend the email. </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default SignUpActivation
