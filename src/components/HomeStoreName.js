import React from 'react'
import { Button, Icon } from 'antd'
import { URL } from '../constants'
import HomeAverageRating from './HomeAverageRating'

const subDivStyle = {
  position: 'absolute',
  top: '70px',
  right: '110px',
  backgroundColor: '#4c475e',
  opacity: "0.7",
  padding: '10px'
}

const titleStyle = {
  fontSize: '18px',
  color: '#fff',
  textTransform: 'uppercase'
}

const buttonStyle = {
  marginTop: '20px',
  marginLeft: '30px',
}

const HomeStoreName = (props) => {
  let divStyle;
  if (props.storeSelected){
    divStyle = {
      height: '150px',
      width: '100%',
      backgroundImage: `url("${props.storeURL}")`,
      backgroundSize: '100%',
      overflow: 'hidden',
      position: 'relative'
    }
  } else {
    divStyle = {
      height: '150px',
      width: '100%',
      backgroundImage: `url("${URL}/images/home-store-name.jpg")`,
      backgroundSize: '100%',
      overflow: 'hidden',
      position: 'relative'
    }
  }
  return (
    <div style={divStyle}>
      { props.storeSelected && props.storeExist && props.button==="Write Review" &&
        <Button onClick={props.handleWriteReview} style={buttonStyle} type="primary"><Icon type="arrow-right" />Write Review</Button>
      }
      { props.storeSelected && props.storeExist && props.button==="Back" &&
        <Button onClick={props.handleBack} style={buttonStyle} type="primary"><Icon type="arrow-left" />All Reviews</Button>
      }
      <div style={subDivStyle}>
        <div style={titleStyle} >{props.storeName}</div>
        <div>
          <HomeAverageRating
            reviewAmount={props.reviewAmount}
            storeOverallScore={props.storeOverallScore}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeStoreName
