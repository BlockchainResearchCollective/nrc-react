import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { validateUsername, validateEmail } from '../actions'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


const tooltipStyle = {
  zIndex: '99999'
}


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      validateStatus: {
        username: '',
        email: ''
      },
      help: {
        username: '',
        email: ''
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkUsername = (rule, value, callback) => {
    this.setState(preState => ({
      ...preState,
      validateStatus:{
        ...preState.validateStatus,
        username: 'validating',
      }
    }))
    const form = this.props.form;
    if (value && !/^[a-zA-Z0-9.+-_@]+$/i.test(value)) {
      this.setState(preState => ({
        ...preState,
        validateStatus:{
          ...preState.validateStatus,
          username: 'error',
        }
      }))
      callback('Username may contain alphanumeric, _, @, +, . and - characters, no blank space')
    } else {
      callback()
    }
  }
  usernameAsyncValidation = () => {
    const { dispatch, form } = this.props
    dispatch(validateUsername(form.getFieldValue('username'), username_status => {
      if (username_status === false) {
        this.setState(preState => ({
          ...preState,
          validateStatus:{
            ...preState.validateStatus,
            username: 'error',
          },
          help:{
            ...preState.help,
            username: 'Username already taken',
          }
        }))
      } else {
        this.setState(preState => ({
          ...preState,
          validateStatus:{
            ...preState.validateStatus,
            username: 'success',
          },
          help:{
            ...preState.help,
            username: '',
          }
        }))
      }
    }))
  }
  checkEmail = (rule, value, callback) => {
    this.setState(preState => ({
      ...preState,
      validateStatus:{
        ...preState.validateStatus,
        email: 'validating',
      }
    }))
    const form = this.props.form;
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      this.setState(preState => ({
        ...preState,
        validateStatus:{
          ...preState.validateStatus,
          email: 'error',
        }
      }))
      callback('Invalid email address')
    } else {
      callback()
    }
  }
  emailAsyncValidation = () => {
    const { dispatch, form } = this.props
    dispatch(validateEmail(form.getFieldValue('email'), email_status => {
      if (email_status === false) {
        this.setState(preState => ({
          ...preState,
          validateStatus:{
            ...preState.validateStatus,
            email: 'error',
          },
          help:{
            ...preState.help,
            email: 'Email already taken',
          }
        }))
      } else {
        this.setState(preState => ({
          ...preState,
          validateStatus:{
            ...preState.validateStatus,
            email: 'success',
          },
          help:{
            ...preState.help,
            email: '',
          }
        }))
      }
    }))
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && !/^[A-Za-z0-9@#$%^&+=]{8,}$/i.test(value)) {
      callback('please enter a complex password')
    } else {
      callback()
    }
  }
  checkConfirmPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords does\'t match');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: {
          span: 6,
          offset: 1,
        },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: {
          span: 15,
          offset: 1,
        },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} id="signUpForm">
        <FormItem
          {...formItemLayout}
          label="Username"
          validateStatus={this.state.validateStatus.username}
          help={this.state.help.username}
        >
          {getFieldDecorator('username', {
            rules: [{ 
              required: true, message: 'Please input your username!'
            },{
              validator: this.checkUsername
            },{
              max: 150, message: 'Username has to be 150 characters or less'
            }],
          })(
            <Input onBlur={this.usernameAsyncValidation} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Email"
          validateStatus={this.state.validateStatus.email}
          help={this.state.help.email}
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid Email!',
            },{
              validator: this.checkEmail
            },{
              required: true, message: 'Please input your Email!',
            }],
          })(
            <Input onBlur={this.emailAsyncValidation} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Password&nbsp;
              <Tooltip overlayStyle={tooltipStyle} title="Invalid Password (at least 8 alphanumeric characters plus #, $, %, ^, &, +, =)">
                <Icon type="info-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.checkConfirmPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <div style={{marginTop: '70px'}}>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I agree to the <a href="#">terms and conditions</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">Sign Up</Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default connect()(WrappedRegistrationForm);
