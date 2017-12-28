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

const WrappedResetPasswordForm = Form.create()(ResetPasswordForm)
export default WrappedResetPasswordForm