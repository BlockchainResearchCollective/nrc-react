import React from 'react'
import { Form, Input, Button, Rate, Upload, Icon, Modal } from 'antd'
import { connect } from 'react-redux'
import { writeReviewAction } from '../actions/transaction'
import { URL } from '../constants'

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
          isPositive: false,
          originalReviewer: this.props.ethAddress
        }
        let content = {
          text: values.content,
          images: []
        }
        if (values.upload && values.upload.length != 0){
          for (let i=0; i<values.upload.length; i++){
            if (values.upload[i].response && values.upload[i].response.hash){
              content.images.push(values.upload[i].response.hash)
            } else if (values.upload[i].name){
              content.images.push(values.upload[i].name)
            }
          }
        }
        console.log(JSON.stringify(content))
        this.props.dispatch(writeReviewAction(this.props.storeId, JSON.stringify(content), parseInt(values.rate)*20, record))
        this.props.handleBack(e)
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
      try {
        let content = JSON.parse(this.props.reviews[this.props.myReviewIndex].content).text
        this.props.form.setFieldsValue({
          content
        })
        let imageList = []
        JSON.parse(this.props.reviews[this.props.myReviewIndex].content).images.map((hash, index) => {
          imageList.push({
            uid: index,
            name: hash,
            status: 'done',
            url: `${URL}/uploads/${hash}`
          })
        })
        this.props.form.setFieldsValue({
          upload: imageList
        })
      }
      catch(error) {
        console.log(error)
        this.props.form.setFieldsValue({
          content: this.props.reviews[this.props.myReviewIndex].content
        })
      }
      this.props.form.setFieldsValue({
        rate: this.props.reviews[this.props.myReviewIndex].score
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem style={{textAlign: 'center'}}>
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
            <TextArea rows={10} placeholder="Review Content" />
          )}
        </FormItem>
        <p style={{color:'#ddd'}}>Please upload your photos: </p>
        <FormItem>
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action={`${URL}/upload`} listType="picture-card" onPreview={this.handlePreview}>
              { this.state.fileList.length < 3 &&
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              }
            </Upload>
          )}
        </FormItem>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} zIndex={10000} >
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
