import React from 'react'
import { Form, Input, Button, Rate, Upload, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { writeReviewAction } from '../actions/transaction'

const FormItem = Form.Item

const { TextArea } = Input

class WriteReviewForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let record = {
          storeName: this.props.storeName,
          value: '0.01',
          isPositive: false,
          originalReviewer: this.props.ethAddress,
          action: "Write Review"
        }
        let content = {
          text: values.content,
          images: []
        }
        if (values.upload.length != 0){
          for (let i=0; i<values.upload.length; i++){
            if (values.upload[i].response.url){
              content.images.push(values.upload[i].response.url)
            }
          }
        }
        console.log(JSON.stringify(content))
        this.props.dispatch(writeReviewAction(this.props.storeId, JSON.stringify(content), parseInt(values.rate)*20, record))
      }
    })
  }

  handleRate = (rule, value, callback) => {
    if (value === 0){
      callback("Please rate!")
    }
    callback()
  }

  normFile = (e) => {
    console.log('Upload event:', e)
    this.setState({
      fileList: e.fileList
    })
    return e && e.fileList
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

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
        <FormItem>
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="http://188.166.190.168:3001/upload" listType="picture-card" onPreview={this.handlePreview}>
              { this.state.fileList.length < 3 &&
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              }
            </Upload>
          )}
        </FormItem>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
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
