import React, { Component } from 'react'
import { Form, Icon, Input, Button, Rate } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item

const { TextArea } = Input

class WriteReviewForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Rate character={<Icon type="star" style={{ fontSize: 20 }} />} defaultValue={0} />
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
