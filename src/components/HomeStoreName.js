import React from 'react'
import { Button } from 'antd'
import { URL } from '../constants'
import HomeAverageRating from './HomeAverageRating'

const divStyle = {
  height: '150px',
  width: '100%',
  backgroundImage: `url("${URL}/images/home-store-name.jpg")`,
  backgroundSize: '100%',
  overflow: 'hidden',
  position: 'relative'
}

const subDivStyle = {
  position: 'absolute',
  top: '80px',
  right: '130px'
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
