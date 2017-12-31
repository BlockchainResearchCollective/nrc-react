import React from 'react'
import { Form, Input, Button, Rate } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item

const { TextArea } = Input

class WriteReviewForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handleRate = (rule, value, callback) => {
    if (value === 0){
      callback("Please rate!")
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('rate', {
            initialValue: 0,
            rules: [{ validator: this.handleRate }],
          })(
            <Rate />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: 'Please input content!' }],
          })(
            <TextArea rows={5} placeholder="Review Content" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedWriteReviewForm = Form.create()(WriteReviewForm)

export default connect()(WrappedWriteReviewForm)
