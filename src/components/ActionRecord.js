import React from 'react'
import { timeConverter } from 'util'

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

const ActionRecord = (props) => {
  return (
    <div style={divStyle}>
      <div style={amountStyle}>
        { props.record.action==='Submit Review' &&
          <p style={{color: 'blue'}}>Submit Review</p>
        }
        { props.record.action==='Vote Review' &&
          <p style={{color: 'green'}}>Vote Review</p>
        }
        { props.record.action==='Create Store' &&
          <p style={{color: 'red'}}>Create Store</p>
        }
      </div>
      <div style={titleStyle}>
        <h3>{props.record.storeName}</h3>
      </div>
      <div style={dateStyle}>
        <p>{timeConverter(props.record.timestamp)}</p>
      </div>
      <div style={hashStyle}>
        <p>{props.record.txHash.slice(0,20) + '...'}</p>
      </div>
    </div>
  )
}

export default ActionRecord
