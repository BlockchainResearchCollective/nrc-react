import React from 'react'
import { Form, Input, Button, Rate } from 'antd'
import { connect } from 'react-redux'
import { writeReviewAction } from '../actions/transaction'

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
        let record = {
          storeName: this.props.storeName,
          balance: this.props.ethBalance,
          originalReviewer: this.props.ethAddress,
          action: "Write Review"
        }
        this.props.dispatch(writeReviewAction(this.props.storeId, values.content, parseInt(values.rate)*20, record))
      }
    })
  }

  handleRate = (rule, value, callback) => {
    if (value === 0){
      callback("Please rate!")
    }
    callback()
  }

  componentDidMount = () => {
    if (this.props.myReviewIndex != -1){
      this.props.form.setFieldsValue({
        rate: this.props.reviews[this.props.myReviewIndex].score,
        content: this.props.reviews[this.props.myReviewIndex].content
      })
    }
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
        { this.props.myReviewIndex==-1 &&
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </FormItem>
        }
        { this.props.myReviewIndex!=-1 &&
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Update
            </Button>
          </FormItem>
        }
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    myReviewIndex: state.transaction.myReviewIndex,
    reviews: state.transaction.reviews
  }
}

const WrappedWriteReviewForm = Form.create()(WriteReviewForm)

export default connect(mapStateToProps)(WrappedWriteReviewForm)
