import React from 'react'
import { URL } from '../constants'

const logoStyle = {
  height: '40px',
  width: '40px',
  marginRight: '10px'
}

const titleStyle = {
  fontSize: '16px',
  fontFamily: 'Open Sans',
  color: '#fff'
}

const Banner = (props) => {
  return (
    <div>
      <img src={`${URL}/images/Logo_vector.svg`} style={logoStyle} alt="logo" />
      <span style={titleStyle} >{props.title}</span>
    </div>
  )
}

export default Banner
