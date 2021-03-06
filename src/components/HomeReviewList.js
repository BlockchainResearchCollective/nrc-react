import React from 'react'
import { connect } from 'react-redux'
import HomeReviewListItem from './HomeReviewListItem'
import { Pagination, Spin } from 'antd'

const hrStyle = {
  backgroundColor: 'white',
  height: '1px',
  border: 'none'
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
      page: 1,
      index: 0
    }
  }

  handleChange = (page) => {
    this.setState({
      page,
      index: (page - 1) * 3
    })
  }

  render(){
    return(
      <div>
        { this.props.reviewAmount>0 &&
          <div>
            {this.props.reviews.slice(this.state.index, this.state.index + 3).map((review, index) =>
              <div key={index}>
                <HomeReviewListItem
                  review={review}
                  voted={review.voted}
                  storeId={this.props.storeId}
                  storeName={this.props.storeName}
                />
              </div>
            )}
            <hr style={hrStyle} />
            <div style={paginationStyle}>
              <Pagination
                current={this.state.page}
                pageSize={3}
                total={this.props.reviewAmount}
                size='small'
                onChange={this.handleChange}
              />
            </div>
          </div>
        }
        { this.props.reviewAmount==0 &&
          <div>
            <hr style={hrStyle} />
            <p style={noReviewStyle}>== No Review ==</p>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.transaction.reviews,
    reviewAmount: parseInt(state.transaction.reviewAmount, 10),
    storeId: state.transaction.storeId,
    storeName: state.transaction.storeName
  }
}

export default connect(mapStateToProps)(HomeReviewList)
