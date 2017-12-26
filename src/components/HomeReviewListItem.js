import React from 'react'
import { Rate, Icon } from 'antd'

const divStyle = {
  paddingLeft: '20px',
  paddingRight: '20px',
  position: 'relative'
}

const hrStyle = {
  color: 'white',
  width: '95%'
}

const titleStyle = {
  color: 'white',
  fontSize: '18px',
}

const timeStyle = {
  color: 'grey',
  fontSize: '14px',
  position: 'absolute',
  top: '0px',
  right: '20px'
}

const contentStyle = {
  color: 'white',
  fontSize: '14px'
}

const voteStyle = {
  color: 'white'
}

const upvoteStyle = {
  marginRight: '20px'
}

const downvoteStyle = {
  marginRight: '20px'
}

const HomeReviewListItem = (props) => {
  return (
    <div>
      <hr style={hrStyle} />
      <div style={divStyle}>
        <div style={titleStyle}>
          <span>{props.review.reviewer}: </span>
          <Rate disabled defaultValue={parseInt(props.review.score)} />
        </div>
        <div style={timeStyle}>
          {props.review.time}
        </div>
        <p style={contentStyle}>
          {props.review.content}
        </p>
        <div style={voteStyle}>
          <span style={upvoteStyle}>{props.review.upvote} <Icon type="like-o" /></span>
          <span style={downvoteStyle}>{props.review.downvote} <Icon type="dislike-o" /></span>
        </div>
      </div>
    </div>
  )
}

export default HomeReviewListItem
