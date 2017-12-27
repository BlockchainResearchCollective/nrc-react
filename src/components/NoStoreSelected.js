import React from 'react'
import { URL } from '../constants'

const textStyle = {
  textAlign: 'center',
  fontSize: '16px',
  fontFamily: 'Open Sans',
  color: '#fff',
  marginTop: '20px'
}

const NoStoreSelected = (props) => {
  return (
    <div style={textStyle}>
      <span>== Please select a store on Google map ==</span>
    </div>
  )
}

export default NoStoreSelected
