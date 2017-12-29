import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { URL } from '../constants'
import { createStoreAction } from '../actions/transaction'

const logoStyle = {
  height: '100%',
  width: '100%'
}

const buttonStyle = {
  textAlign: 'center'
}

const CreateStore = (props) => {

  const handleClick = () => {
    props.dispatch(createStoreAction(props.storeId))
  }

  return (
    <div>
      <img src={`${URL}/images/Icon_createstore.svg`} style={logoStyle} alt="logo" />
      <div style={buttonStyle}>
        <Button onClick={handleClick} type="primary">Create Store</Button>
      </div>
    </div>
  )
}

export default connect()(CreateStore)
