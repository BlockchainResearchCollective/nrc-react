import React from 'react'
import { connect } from 'react-redux'
import { Rate, Icon, Modal } from 'antd'
import { voteReviewAction } from '../actions/transaction'
import { URL } from '../constants'

const divStyle = {
  paddingLeft: '20px',
  paddingRight: '20px',
  position: 'relative'
}

const hrStyle = {
  backgroundColor: '#67627c',
  height: '1px',
  border: 'none',
  marginBottom: '0px'
}

const titleStyle = {
  color: 'white',
  fontSize: '16px',
}

const timeStyle = {
  color: '#67627c',
  fontSize: '12px',
  position: 'absolute',
  top: '8px',
  right: '20px'
}

const contentStyle = {
  color: '#ddd',
  fontSize: '12px'
}

const voteStyle = {
  color: 'white',
  cursor: 'pointer',
  position: 'absolute',
  bottom: '0px',
  right: '0px'
}

const upvoteStyle = {
  marginRight: '20px'
}

const downvoteStyle = {
  marginRight: '20px'
}

const disabledVoteStyle = {
  color: 'grey',
  cursor: 'not-allowed',
  position: 'absolute',
  bottom: '0px',
  right: '0px'
}

class HomeReviewListItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      upvote: 0,
      downvote: 0,
      voted: true,
      content: "",
      imageList: [],
      previewVisible: false,
      previewImage: ""
    }
  }

  componentDidMount = () => {
    this.setState({
      upvote: parseInt(this.props.review.upvote),
      downvote: parseInt(this.props.review.downvote),
      voted: this.props.voted,
    })
    try {
      let content = JSON.parse(this.props.review.content).text
      let imageList = JSON.parse(this.props.review.content).images
      this.setState({
        content,
        imageList
      })
    }
    catch(error) {
      this.setState({
        content: this.props.review.content
      })
    }
  }

  handleUpvoteClick = () => {
    console.log("upvote")
    if (!this.state.voted){
      this.setState((prevState) => {
        return {
          upvote: prevState.upvote + 1,
          voted: true,
          isUpvote: true,
        }
      })
      let record
      if (new Date().getTime() > (parseInt(this.props.review.timestamp) + 600) * 1000){
        record = {
          storeName: this.props.storeName,
          value: '0.001',
          isPositive: false,
          originalReviewer: this.props.review.reviewerAddress,
          action: "Vote Review",
          status: "Normal Vote"
        }
      } else {
        record = {
          storeName: this.props.storeName,
          value: '0.001',
          isPositive: false,
          originalReviewer: this.props.review.reviewerAddress,
          action: "Vote Review",
          status: "Processing Vote"
        }
      }
      /* vote review */
      this.props.dispatch(voteReviewAction(this.props.storeId, this.props.review.reviewerAddress, true, record))
    }
  }

  handleDownvoteClick = () => {
    console.log("downvote")
    if (!this.state.voted){
      this.setState((prevState) => {
        return {
          downvote: prevState.downvote + 1,
          voted: true,
          isUpvote: false,
        }
      })
      let record
      if (new Date().getTime() > (parseInt(this.props.review.timestamp) + 600) * 1000){
        record = {
          storeName: this.props.storeName,
          value: '0.001',
          isPositive: false,
          originalReviewer: this.props.review.reviewerAddress,
          action: "Vote Review",
          status: "Normal Vote"
        }
      } else {
        record = {
          storeName: this.props.storeName,
          value: '0.001',
          isPositive: false,
          originalReviewer: this.props.review.reviewerAddress,
          action: "Vote Review",
          status: "Processing Vote"
        }
      }
      /* vote review */
      this.props.dispatch(voteReviewAction(this.props.storeId, this.props.review.reviewerAddress, false, record))
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (url) => {
    this.setState({
      previewImage: url,
      previewVisible: true,
    })
  }

  render(){
    return(
      <div>
        <hr style={hrStyle} />
        <div style={divStyle}>
          <div style={titleStyle}>
            <span><Icon type="user" /> {this.props.review.reviewer}: </span>
            <Rate character={<Icon type="star" style={{ fontSize:'14px' }} />} disabled value={parseInt(this.props.review.score, 10)} />
          </div>
          <div style={timeStyle}>
            {this.props.review.time}
          </div>
          <p style={contentStyle}>
            {this.state.content}
          </p>
          <div>
            {this.state.imageList.map((hash) =>
              <img style={{width:'70px', height:'70px', padding:'5px', cursor: 'zoom-in'}} src={`${URL}/uploads/${hash}`} onClick={() => this.handlePreview(`${URL}/uploads/${hash}`)}/>
            )}
            {this.state.imageList.length == 0 &&
              <div style={{height: '10px'}}></div>
            }
          </div>
          { this.state.voted &&
            <div style={disabledVoteStyle}>
              <span style={upvoteStyle} >{this.state.upvote} <Icon type="like-o" /></span>
              <span style={downvoteStyle} >{this.state.downvote} <Icon type="dislike-o" /></span>
            </div>
          }
          { !this.state.voted &&
            <div style={voteStyle}>
              <span style={upvoteStyle} onClick={this.handleUpvoteClick} >{this.state.upvote} <Icon type="like-o" /></span>
              <span style={downvoteStyle} onClick={this.handleDownvoteClick} >{this.state.downvote} <Icon type="dislike-o" /></span>
            </div>
          }
          <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel} zIndex={10000} >
            <img alt="image" style={{ width: '100%' }} src={this.state.previewImage} />
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect()(HomeReviewListItem)
