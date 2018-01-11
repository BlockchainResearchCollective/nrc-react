import React from 'react'
import { Icon, Pagination } from 'antd'
import WalletRecord from './WalletRecord'
import { readHistory } from '../service/backend'

const divStyle = {
  marginLeft: '20px',
  marginRight: '20px'
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
const noRecordStyle = {
  textAlign: 'center',
  color: 'white'
}
const paginationStyle = {
  textAlign: 'center'
}

class Wallet extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      recordAmount: 1,
      records: []
    }
  }

  componentDidMount() {
    readHistory(1, (response) => {
      this.setState({
        records: response.txHistory,
        recordAmount: response.total
      })
    })
  }

  handleChange = (page) => {
    console.log('Change to page ' + page)
    readHistory(page, (response) => {
      this.setState({
        records: response.txHistory,
        recordAmount: response.total
      })
    })
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
          { this.state.recordAmount==0 &&
            <div>
              <p style={noRecordStyle}>== No Record ==</p>
            </div>
          }
          { this.state.recordAmount!=0 &&
            <div style={paginationStyle}>
              <Pagination
                pageSize={5}
                total={this.state.recordAmount}
                size='small'
                onChange={this.handleChange}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Wallet
