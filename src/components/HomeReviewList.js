import React, { Component } from 'react'
import HomeReviewListItem from './HomeReviewListItem'
import { Pagination } from 'antd'

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
            pageSize={4}
            total={this.props.reviewAmount}
            size='small'
          />
        </div>
      </div>
    )
  }
}

export default HomeReviewList
