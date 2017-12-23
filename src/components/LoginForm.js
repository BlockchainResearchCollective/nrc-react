import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from '../actions'

const FormItem = Form.Item;

class LoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
        const { dispatch } = this.props
        dispatch(login(values.username, values.password))
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <a className="login-form-forgot" href="">Forgot password</a>
          <a className="login-form-signup" href="">Sign Up</a>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm)

export default connect()(WrappedLoginForm)
