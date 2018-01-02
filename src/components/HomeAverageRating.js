import React from 'react'
import { Rate } from 'antd'

const ratingStyle = {
  fontSize: '14px',
  color: 'yellow',
  marginRight: '10px'
}

const reviewNumberStyle = {
  fontSize: '14px',
  color: '#fff'
}

const scaleConverter = (averageRating) => {
  let i = 0;
  while (averageRating - 0.5 >= 0){
    i += 0.5;
    averageRating -= 0.5;
  }
  return i;
}

const parseScore = (score) => {
  if (score){
    return (parseFloat(score)/20).toFixed(1)
  } else {
    return '0.0'
  }
}

const HomeAverageRating = (props) => {
  return (
    <div>
      <span style={ratingStyle} >{parseScore(props.storeOverallScore)}</span>
      <Rate allowHalf disabled defaultValue={scaleConverter(parseFloat(props.storeOverallScore)/20)} />
      <span style={reviewNumberStyle} >| {props.reviewAmount} Reviews</span>
    </div>
  )
}

export default HomeAverageRating
