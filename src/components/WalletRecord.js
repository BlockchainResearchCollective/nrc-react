import React from 'react'
import { Icon } from 'antd'
import { timeConverter } from '../service/util'

const divStyle = {
  border: '1px solid',
  borderRadius: '5px',
  backgroundColor: 'white',
  boxShadow: '1px 1px 1px black',
  height: '70px',
  position: 'relative',
  marginBottom: '10px',
}
const titleStyle = {
  color: 'black',
  fontSize: '14px',
  padding: '10px',
}
const amountStyle = {
  fontSize: '16px',
  position: 'absolute',
  top: '10px',
  right: '10px',
}
const dateStyle = {
  fontSize: '12px',
  position: 'absolute',
  top: '40px',
  right: '10px',
}
const hashStyle = {
  padding: '10px',
  fontSize: '12px',
  position: 'absolute',
  top: '30px',
  textDecoration: 'none'
}

const WalletRecord = (props) => {
  return (
    <div style={divStyle}>
      { props.record.isPositive &&
        <div style={amountStyle}>
          <p style={{color: 'green'}}>+ {props.record.value} Ether</p>
        </div>
      }
      { !props.record.isPositive &&
        <div style={amountStyle}>
          <p style={{color: 'red'}}>- {props.record.value} Ether</p>
        </div>
      }
      <div style={titleStyle}>
        <h3>{props.record.action}</h3>
      </div>
      <div style={dateStyle}>
        <p>{timeConverter(props.record.timestamp)}</p>
      </div>
      <div style={hashStyle}>
        <a href={'https://kovan.etherscan.io/tx/'+props.record.txHash} target='_blank'>{props.record.txHash.slice(0,20) + '...'}<Icon type="link" /></a>
      </div>
    </div>
  )
}

export default WalletRecord
