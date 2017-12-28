import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Banner from '../components/Banner'
import { Row, Col, Icon, Form, Input, Button, Spin } from 'antd'
import { changePassword, resetPasswordExpiredAction } from '../actions'
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
class NewPasswordForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
	}

	handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

	checkConfirmPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords does\'t match');
    } else {
      callback();
    }
  }
  handleSubmit = (e) => {
  	e.preventDefault()
  	this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	this.props.handleNewPasswordSubmit(values) 
      }
    })
  }
	render(){
		const { getFieldDecorator } = this.props.form
		return (
			<div style={{marginTop:'30px'}}>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...centralFormItemLayout}
	        >
	          {getFieldDecorator('password', {
	            rules: [{
	              required: true, message: 'Please input your password!',
	            },{
	              pattern: /^[A-Za-z0-9@#$%^&+=]{8,}$/i, message: 'please enter a complex password',
	            }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
	          )}
	        </FormItem>
	        <FormItem
						{...centralFormItemLayout}
	        >
	          {getFieldDecorator('confirm', {
	            rules: [{
	              required: true, message: 'Please confirm your password!',
	            }, {
	              validator: this.checkConfirmPassword,
	            }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm Password" />
	          )}
	        </FormItem>
	        <FormItem
	        	{...centralFormItemLayout}
	        >
	          <Button type="primary" htmlType="submit" className="login-form-button">Submit</Button>
	        </FormItem>	
				</Form>
			</div>
		)
	}
}

const WrappedNewPasswordForm = Form.create()(NewPasswordForm)
export default WrappedNewPasswordForm