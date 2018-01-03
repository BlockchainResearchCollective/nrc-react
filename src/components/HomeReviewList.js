import React from 'react'
import { connect } from 'react-redux'
import HomeReviewListItem from './HomeReviewListItem'
import { Pagination, Spin } from 'antd'

const hrStyle = {
  backgroundColor: 'white',
  width: '95%',
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
      reviews: []
    }
  }

  handleChange = (page) => {
    var index = (page - 1) * 3
    this.setState({
      reviews: this.props.reviews.slice(index, index + 3)
    })
  }

  componentDidMount() {
    this.handleChange(1)
  }

  render(){
    return(
      <div>
        { this.props.reviewAmount>0 &&
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
    reviewAmount: parseInt(state.transaction.reviewAmount, 10)
  }
}

export default connect(mapStateToProps)(HomeReviewList)
