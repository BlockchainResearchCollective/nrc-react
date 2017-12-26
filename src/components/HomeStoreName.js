import React from 'react'
import { Button } from 'antd'
import { URL } from '../constants'
import HomeAverageRating from './HomeAverageRating'

const subDivStyle = {
  position: 'absolute',
  top: '80px',
  right: '130px',
  backgroundColor: '#4c475e',
  opacity: "0.7"
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
      { props.storeSelected && props.storeExist &&
        <Button style={buttonStyle} type="primary">Write Review</Button>
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
