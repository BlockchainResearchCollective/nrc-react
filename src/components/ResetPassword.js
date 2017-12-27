import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import { Row, Col, Icon, Form, Input, Button } from 'antd'
import { resetPassword, verifyReset, changePassword, resetPasswordExpiredAction } from '../actions'

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
			{ 
				<div>
					<div style={headerStyle}>
						<Banner title='Reset Your Password' />
					</div>	
					<Row style={{marginTop:'30px'}}>
						<Col offset={4} span={16}>
							<p style={helpTextStyle}>Enter your email address to reset your password. You may need to check your spam folder</p>
						</Col>
					</Row>
					<WrappedResetPasswordForm 
						dispatch={this.props.dispatch}
						resetSent={this.props.resetSent}
						resetVerified={this.props.resetVerified}
						passwordChanged={this.props.passwordChanged} 
					/>
				</div>
			}
			</div>
		)
	}
}

class ResetPasswordForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			countdown: 90
		}
	}

	handleResetEmailSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props
        dispatch(resetPassword(values.email))

        const clock = setInterval(()=>{
        	this.setState({
        		countdown: this.state.countdown-1
        	})
        	if (this.state.countdown === 0) {
	        	clearInterval(clock)
	        	this.setState({
	        		countdown: 90
	        	})
	        	alert("Your reset code has expired, please re-send your request")
	        	dispatch(resetPasswordExpiredAction(values.email))
	        }
        },1000)

        
      }
    });
	}
	render(){
		const { getFieldDecorator } = this.props.form
		return (
			<div style={{marginTop:'30px'}}>
				<Form layout='inline' onSubmit={this.handleResetEmailSubmit}>
					<FormItem
						style={{marginLeft: '16.7%', width:'46%'}}
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
	        	{ !this.props.resetSent &&
	          	<Button type="primary" htmlType='submit'>Send</Button>
	        	}
	        	{
	        		this.props.resetSent && 
	        		<Button type="default" htmlType='button' style={{backgroundColor:'#FFCC66'}}>{this.state.countdown} s</Button>
	        	}
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
	console.log(state)
  return {
    resetSent: state.user.resetPassword===undefined ? state.user.initialState.resetPassword : state.user.resetPassword,
    resetVerified: state.user.resetVerified===undefined ? state.user.initialState.resetVerified : state.user.resetVerified,
    passwordChanged: state.user.passwordChanged===undefined ? state.user.initialState.passwordChanged : state.user.passwordChanged
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm)

export default connect(mapStateToProps)(ResetPassword)