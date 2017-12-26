import React, { Component } from 'react'
import HomeReviewListItem from './HomeReviewListItem'
import { Pagination } from 'antd'

const divStyle = {
  overflow: 'scroll'
}

const hrStyle = {
  color: 'white',
  width: '95%'
}

const paginationStyle = {
  textAlign: 'center'
}

class HomeReviewList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      pageNumber: 1,
      reviews: [{
        reviewer: 'zzy',
        score: 4,
        content: 'this is a sample review',
        upvote: 10,
        downvote: 5,
        time: '26/12/2017'
      },{
        reviewer: 'zzy',
        score: 4,
        content: 'this is a sample review',
        upvote: 10,
        downvote: 5,
        time: '26/12/2017'
      },{
        reviewer: 'zzy',
        score: 4,
        content: 'this is a sample review',
        upvote: 10,
        downvote: 5,
        time: '26/12/2017'
      }]
    }
  }

  componentDidMount() {
  }

  render(){
    return(
      <div style={divStyle}>
        {this.state.reviews.map((review) =>
          <HomeReviewListItem
            review={review}
          />
        )}
        <hr style={hrStyle} />
        <div style={paginationStyle}>
          <Pagination
            defaultCurrent={this.state.pageNumber}
            pageSize={3}
            total={this.props.reviewAmount}
            size='small'
          />
        </div>
      </div>
    )
  }
}

export default HomeReviewList
