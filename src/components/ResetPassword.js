import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import WrappedResetPasswordForm from './ResetPasswordForm'
import WrappedNewPasswordForm from './NewPasswordForm'
import { Row, Col, Icon, Form, Input, Button, Spin } from 'antd'
import { resetPassword, verifyReset, changePassword, resetPasswordExpiredAction } from '../actions'

const FormItem = Form.Item
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
	handleNewPasswordSubmit = (values) => {
		const { dispatch } = this.props
		dispatch(changePassword(values.password))
		this.setState({
			changePasswordSent:true
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
					<div style={headerStyle}>
						<Banner title='Reset Your Password' />
					</div>	
					<Row style={{marginTop:'30px'}}>
						<Col offset={4} span={16}>
							<p style={helpTextStyle}>Please enter a new password for your email account</p>
						</Col>
					</Row>
					<WrappedNewPasswordForm 
						dispatch={this.props.dispatch}
						handleNewPasswordSubmit={this.handleNewPasswordSubmit}
					/>
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
const mapStateToProps = state => {
  return {
    resetSent: state.user.resetPassword===undefined ? state.user.initialState.resetPassword : state.user.resetPassword,
    resetVerified: state.user.resetVerified===undefined ? state.user.initialState.resetVerified : state.user.resetVerified,
    passwordChanged: state.user.passwordChanged===undefined ? state.user.initialState.passwordChanged : state.user.passwordChanged
  }
}

export default connect(mapStateToProps)(ResetPassword)