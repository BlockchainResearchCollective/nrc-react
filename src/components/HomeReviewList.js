import React from 'react'
import HomeReviewListItem from './HomeReviewListItem'
import { Pagination, Spin } from 'antd'
import { readReview } from '../service/blockchain'
import { timeConverter } from '../service/util'

const hrStyle = {
  color: 'white',
  width: '95%'
}
const paginationStyle = {
  textAlign: 'center'
}
const loadingStyle = {
  margin: '50px',
  textAlign: 'center'
}
const noReviewStyle = {
  textAlign: 'center',
  color: 'white'
}

class HomeReviewList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isProcessing: true,
      pageNumber: 1,
      reviews: []
    }
  }

  componentDidMount() {
    var index = this.state.pageNumber
    if (this.props.reviewAmount >= index){
      readReview(this.props.storeId, index, (review) => {
        review.time = timeConverter(review.time)
        review.reviewer = review.reviewerAddress
        this.state.reviews.push(review)
        this.setState({
          isProcessing: false
        })
      })
    } else {
      this.setState({
        isProcessing: false
      })
    }
  }

  render(){
    return(
      <div>
        { !this.state.isProcessing && this.props.reviewAmount>0 &&
          <div>
            {this.state.reviews.map((review, index) =>
              <div key={index}>
                <HomeReviewListItem
                  review={review}
                />
              </div>
            )}
            <hr style={hrStyle} />
            <div style={paginationStyle}>
              <Pagination
                defaultCurrent={this.state.pageNumber}
                pageSize={1}
                total={this.props.reviewAmount}
                size='small'
              />
            </div>
          </div>
        }
        { !this.state.isProcessing && this.props.reviewAmount==0 &&
          <div>
            <hr style={hrStyle} />
            <p style={noReviewStyle}>== No Review ==</p>
          </div>
        }
        { this.state.isProcessing &&
          <div style={loadingStyle}>
            <Spin size="large" />
          </div>
        }
      </div>
    )
  }
}

export default HomeReviewList
