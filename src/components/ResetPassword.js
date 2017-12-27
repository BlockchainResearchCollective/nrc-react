import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import { Row, Col, Icon, Form, Input, Button } from 'antd'
const FormItem = Form.Item
const centralFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  }
}
const headerStyle = {
  width: '50%',
  margin: '0 auto',
  marginTop: '40px'
}

const helpTextStyle = {
	color: '#fff'
}
class ResetPassword extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	
	render(){
		
		return (
			<div>
			{ this.props.resetSent == false &&
				<div>
					<div style={headerStyle}>
						<Banner title='Reset Your Password' />
					</div>	
					<Row style={{marginTop:'30px'}}>
						<Col offset={4} span={16}>
							<p style={helpTextStyle}>Enter your email address to reset your password. You may need to check your spam folder</p>
						</Col>
					</Row>
					<WrappedResetPasswordForm />
				</div>
			}
			</div>
		)
	}
}

class ResetPasswordForm extends React.Component{
	render(){
		const { getFieldDecorator } = this.props.form
		
		return (
			<div style={{marginTop:'30px'}}>
				<Form layout='inline'>
					<FormItem
						style={{marginLeft: '16.7%', width:'42.7%'}}
	        >
	          {getFieldDecorator('email', {
	            rules: [{
	              required: true, message: 'Please input your email!',
	            },{
	              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address',
	            }],
	          })(
	            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Email" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button type="primary">Submit</Button>
	        </FormItem>	
				</Form>
				<Form style={{marginTop:'20px'}}>
					<FormItem
						{...centralFormItemLayout}
	        >
	          {getFieldDecorator('verificationCode', {
	            
	          })(
	            <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Verification Code" />
	          )}
	        </FormItem>
	        <FormItem
	        	{...centralFormItemLayout}
	        >
	          <Button type="primary" className="login-form-button">Verify</Button>
	        </FormItem>	
				</Form>
			</div>
		)
	}
}
const mapStateToProps = state => {
  return {
    resetSent: state.user.initialState.resetPassword,
    resetVerified: state.user.initialState.resetVerified,
    passwordChanged: state.user.initialState.passwordChanged
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm)
export default connect(mapStateToProps)(ResetPassword)