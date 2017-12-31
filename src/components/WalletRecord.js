import React from 'react'

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
}

const WalletRecord = (props) => {
  return (
    <div style={divStyle}>
      <div style={amountStyle}>
        { props.record.positive &&
          <p style={{color: 'red'}}>+ {props.record.amount} Ether</p>
        }
        { !props.record.positive &&
          <p style={{color: 'green'}}>- {props.record.amount} Ether</p>
        }
      </div>
      <div style={titleStyle}>
        <h3>{props.record.action}</h3>
      </div>
      <div style={dateStyle}>
        <p>{props.record.date}</p>
      </div>
      <div style={hashStyle}>
        <p>{props.record.transactionHash}</p>
      </div>
    </div>
  )
}

export default WalletRecord
