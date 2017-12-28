import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import { Row, Col, Icon, Form, Input, Button, Spin } from 'antd'
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
const loadingStyle = {
	fontSize: '50px',
	marginTop:"100px"
}
class ResetPassword extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			resetVerifySent: false,
			changePasswordSent: false
		}
	}
	handleVerify = (values) => {
		const { dispatch } = this.props
		dispatch(verifyReset(values.email, values.verificationCode))
		this.setState({
			resetVerifySent: true
		})
	}
	render(){
		return (
			<div>
			{ !this.state.resetVerifySent &&
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
						handleVerify={this.handleVerify} 
					/>
				</div>
			}
			{	this.state.resetVerifySent && !this.props.resetVerified &&
				<div>
					<Row>
						<Col offset={10}>
							<Spin indicator={<Icon type="loading" style={loadingStyle} spin />} />
						</Col>
					</Row>
				</div>
			}
			{	this.props.resetVerified && !this.state.changePasswordSent &&
				<div>
				</div>
			}
			{	this.state.changePasswordSent && !this.props.passwordChanged &&
				<div>
					<Row>
						<Col offset={10}>
							<Spin indicator={<Icon type="loading" style={loadingStyle} spin />} />
						</Col>
					</Row>
				</div>
			}
			{	this.props.passwordChanged &&
				<div>
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
			countdown: 90,
			resetVerifySent: false
		}
	}

	handleResetEmailSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        const { dispatch } = this.props
        dispatch(resetPassword(values.email))
        
        // use this.timer so that in handleResetVerifySubmit, timer could be cleared.
        this.timer = setInterval(()=>{
        	this.setState({
        		countdown: this.state.countdown-1
        	})
        	if (this.state.countdown === 0) {
	        	this.setState({
	        		countdown: 90
	        	})
	        	alert("Your reset code has expired, please re-send your request")
	        	dispatch(resetPasswordExpiredAction(values.email))
	        	clearInterval(this.timer)
	        }
        },1000)    
      }
    })
	}

	handleResetVerifySubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFieldsAndScroll((err, values) => {
			if(!err) {
				const { dispatch } = this.props
				clearInterval(this.timer)
				this.setState({
					resetVerifySent: true,
					countdown: 90
				})
				this.props.handleVerify(values)
			}
		})
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
				<Form style={{marginTop:'20px'}} onSubmit={this.handleResetVerifySubmit}>
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
	          <Button type="primary" htmlType="submit" className="login-form-button">Verify</Button>
	        </FormItem>	
				</Form>
			</div>
		)
	}
}
const mapStateToProps = state => {
  return {
    resetSent: state.user.resetPassword===undefined ? state.user.initialState.resetPassword : state.user.resetPassword,
    resetVerified: state.user.resetVerified===undefined ? state.user.initialState.resetVerified : state.user.resetVerified,
    passwordChanged: state.user.passwordChanged===undefined ? state.user.initialState.passwordChanged : state.user.passwordChanged
  }
}

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm)

export default connect(mapStateToProps)(ResetPassword)