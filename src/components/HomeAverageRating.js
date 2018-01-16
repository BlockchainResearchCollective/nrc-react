import React from 'react'
import { Rate, Icon } from 'antd'

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
      <Rate allowHalf disabled value={scaleConverter(parseFloat(props.storeOverallScore)/20)} style={{fontSize:'14px'}}/>
      <span style={reviewNumberStyle} >
        | {props.reviewAmount} Reviews <span onClick={props.handleWriteReview}><Icon type="edit" style={{color:'#ffdc85', cursor:'pointer', fontSize:'16px'}}/></span>
      </span>
    </div>
  )
}

export default HomeAverageRating
