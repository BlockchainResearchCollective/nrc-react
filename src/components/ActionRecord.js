import React from 'react'
import { Icon } from 'antd'
import { timeConverter } from '../service/util'

const titleStyle = {
  color: '#58595b',
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
  let divStyle = {
    border: '1px solid',
    borderRadius: '5px',
    backgroundColor: 'white',
    boxShadow: '1px 1px 1px black',
    height: '70px',
    position: 'relative',
    marginBottom: '10px',
    borderLeftWidth: '5px'
  }
  if (props.record.status==='Authentic Review' || props.record.status==='Authentic Vote'){
    divStyle.borderLeftColor = '#58c989'
  } else if (props.record.status==='Inauthentic Review' || props.record.status==='Inauthentic Vote'){
    divStyle.borderLeftColor = '#f06664'
  } else if (props.record.status==='Store Created'){
    divStyle.borderLeftColor = '#ff00ff'
  } else {
    divStyle.borderLeftColor = '#6699ff'
  }
  return (
    <div style={divStyle}>
      <div style={amountStyle}>
        { props.record.status==='Authentic Review' &&
          <p style={{color: '#58c989'}}>Authentic Review</p>
        }
        { props.record.status==='Authentic Vote' &&
          <p style={{color: '#58c989'}}>Authentic Vote</p>
        }
        { props.record.status==='Inauthentic Review' &&
          <p style={{color: '#f06664'}}>Inauthentic Review</p>
        }
        { props.record.status==='Inauthentic Vote' &&
          <p style={{color: '#f06664'}}>Inauthentic Vote</p>
        }
        { props.record.status==='Store Created' &&
          <p style={{color: '#ff00ff'}}>Store Created</p>
        }
        { props.record.status==='Processing Review' &&
          <p style={{color: '#6699ff'}}>Processing Review</p>
        }
        { props.record.status==='Processing Vote' &&
          <p style={{color: '#6699ff'}}>Processing Vote</p>
        }
      </div>
      { props.record.storeName &&
        <div style={titleStyle}>
          <h3>{props.record.storeName.slice(0,20) + '...'}</h3>
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
