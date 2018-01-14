import React from 'react'
import { Button, Icon } from 'antd'
import { URL } from '../constants'
import HomeAverageRating from './HomeAverageRating'

const backgroundStyle = {
  background: 'linear-gradient(rgba(255,255,255,0.6), rgba(0,0,0,0.6))',
  width: '100%',
  height: '100%'
}

const subDivStyle = {
  position: 'absolute',
  top: '70px',
  right: '110px',
  padding: '10px'
}

const titleStyle = {
  fontSize: '18px',
  color: '#fff',
  textTransform: 'uppercase'
}

const buttonStyle = {
  marginTop: '20px',
  marginLeft: '30px'
}

const displayName = (storeName) => {
  let storeNameList = storeName.split(' ')
  let i = 1
  let display = storeNameList[0]
  while (i < storeNameList.length && display.length + storeNameList[i].length < 23){
    display = display + " " + storeNameList[i]
    i++
  }
  return display
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
      <div style={backgroundStyle}>
        { props.storeSelected && props.storeExist && props.button==="Write Review" &&
          <Button onClick={props.handleWriteReview} style={buttonStyle} type="primary"><Icon type="arrow-right" />Write Review</Button>
        }
        { props.storeSelected && props.storeExist && props.button==="Back" &&
          <Button onClick={props.handleBack} style={buttonStyle} type="primary"><Icon type="arrow-left" />All Reviews</Button>
        }
        <div style={subDivStyle}>
          <div style={titleStyle} >{displayName(props.storeName)}</div>
          <div>
            <HomeAverageRating
              reviewAmount={props.reviewAmount}
              storeOverallScore={props.storeOverallScore}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeStoreName
