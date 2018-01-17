import React from 'react'
import { Button, Icon, Tooltip } from 'antd'
import { URL } from '../constants'
import HomeAverageRating from './HomeAverageRating'

const backgroundStyle = {
  background: 'linear-gradient(rgba(255,255,255,0.6), rgba(0,0,0,0.6))',
  width: '100%',
  height: '100%'
}

const subDivStyle = {
  position: 'absolute',
  left: '20px',
  bottom: '15px'
}

const titleStyle = {
  fontSize: '20px',
  color: '#fff',
  textTransform: 'uppercase',
  cursor: 'help'
}

const buttonStyle = {
  position: 'absolute',
  left: '20px',
  top: '20px',
}

const logoStyle = {
  position: 'absolute',
  right: '10px',
  top: '10px',
  width: '80px',
  height: '80px'
}

const displayName = (storeName) => {
  let storeNameList = storeName.split(' ')
  let i = 1
  let display = storeNameList[0]
  while (i < storeNameList.length && display.length + storeNameList[i].length < 25){
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
        <img src={`${URL}/images/Icon_Badge_1.svg`} style={logoStyle} alt="logo" />
        { props.storeSelected && props.storeExist &&
          <Button onClick={props.handleWriteReview} style={buttonStyle} type="primary"><Icon type="arrow-right" />Write Review</Button>
        }
        <div style={subDivStyle}>
          <div style={titleStyle} >
            <Tooltip title={props.storeName} overlayStyle={{zIndex: '10000'}}>
              <span>
                {displayName(props.storeName)}
              </span>
            </Tooltip>
          </div>
          <div>
            <HomeAverageRating
              reviewAmount={props.reviewAmount}
              storeOverallScore={props.storeOverallScore}
              handleWriteReview={props.handleWriteReview}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeStoreName
