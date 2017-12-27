import React from 'react'
import { Button } from 'antd'
import { URL } from '../constants'

const logoStyle = {
  height: '100%',
  width: '100%'
}

const buttonStyle = {
  textAlign: 'center'
}

const CreateStore = (props) => {
  return (
    <div>
      <img src={`${URL}/images/Icon_createstore.svg`} style={logoStyle} alt="logo" />
      <div style={buttonStyle}>
        <Button type="primary">Create Store</Button>
      </div>
    </div>
  )
}

export default CreateStore
