import React, { Component } from 'react'
import { Icon, Pagination } from 'antd'
import WalletRecord from './WalletRecord'

const divStyle = {
  marginLeft: '30px',
  marginRight: '30px'
}
const headStyle = {
  backgroundColor: 'white',
  marginLeft: '10px',
  marginRight: '10px',
  textAlign: 'center',
  border: '2px solid #3399ff',
  borderRadius: '5px',
}
const backgroundStyle = {
  backgroundImage: `url("http://188.166.190.168:3001/images/Wallet_bg.svg")`,
  paddingTop: '10px'
}
const titleStyle = {
  color: 'grey',
  fontSize: '20px',
  textAlign: 'center',
  marginTop: '10px'
}
const hrStyle = {
  color: '#dddddd',
  width: '95%',
}
const paginationStyle = {
  textAlign: 'center'
}

class Wallet extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 0,
      recordAmount: 1,
      records: [{
        action: 'Submit review',
        positive: false,
        amount: '0.01',
        transactionHash: 'dafajdkasf',
        date: '28/12/2017'
      },{
        action: 'Submit review',
        positive: true,
        amount: '0.01',
        transactionHash: 'dafajdkasf',
        date: '28/12/2017'
      },{
        action: 'Submit review',
        positive: false,
        amount: '0.01',
        transactionHash: 'dafajdkasf',
        date: '28/12/2017'
      },{
        action: 'Submit review',
        positive: true,
        amount: '0.01',
        transactionHash: 'dafajdkasf',
        date: '28/12/2017'
      }]
    }
  }

  render() {
    return (
      <div>
        <div style={headStyle}>
          <div style={backgroundStyle}>
            <h3><Icon type='wallet'/> Your Account</h3>
            <p>{this.props.address}</p>
          </div>
        </div>
        <div style={divStyle}>
          <h3 style={titleStyle}>Transaction History</h3>
          <hr style={hrStyle} />
          {this.state.records.map((record, index) =>
            <div key={index}>
              <WalletRecord
                record={record}
              />
            </div>
          )}
          <div style={paginationStyle}>
            <Pagination
              defaultCurrent={this.state.pageNumber}
              pageSize={4}
              total={this.props.recordAmount}
              size='small'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Wallet
