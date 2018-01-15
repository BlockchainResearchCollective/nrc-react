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

const ActionRecord = (props) => {
  return (
    <div style={divStyle}>
      <div style={amountStyle}>
        { props.record.status==='Authentic Review' &&
          <p style={{color: 'green'}}>Authentic Review</p>
        }
        { props.record.status==='Authentic Vote' &&
          <p style={{color: 'green'}}>Authentic Vote</p>
        }
        { props.record.status==='Inauthentic Review' &&
          <p style={{color: 'red'}}>Inauthentic Review</p>
        }
        { props.record.status==='Inauthentic Vote' &&
          <p style={{color: 'red'}}>Inauthentic Vote</p>
        }
        { props.record.status==='Store Created' &&
          <p style={{color: 'purple'}}>Store Created</p>
        }
        { props.record.status==='Processing Review' &&
          <p style={{color: 'blue'}}>Processing Review</p>
        }
        { props.record.status==='Processing Vote' &&
          <p style={{color: 'blue'}}>Processing Vote</p>
        }
      </div>
      { props.record.storeName &&
        <div style={titleStyle}>
          <h3>{props.record.storeName}</h3>
        </div>
      }
      { !props.record.storeName &&
        <div style={titleStyle}>
          <h3>[Automatic Claim]</h3>
        </div>
      }
      <div style={dateStyle}>
        <p>{timeConverter(props.record.timestamp)}</p>
      </div>
      <div style={hashStyle}>
        <a href={'https://kovan.etherscan.io/tx/'+props.record.txHash} target='_blank'>{props.record.txHash.slice(0,20) + '...'}<Icon type="link" /></a>
      </div>
    </div>
  )
}

export default ActionRecord
