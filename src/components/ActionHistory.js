import React from 'react'
import { Pagination, Rate } from 'antd'
import ActionRecord from './ActionRecord'
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
  backgroundImage: `url("http://188.166.190.168:3001/images/Action_bg.svg")`,
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
const noRecordStyle = {
  textAlign: 'center',
  color: 'white'
}
const scaleConverter = (averageRating) => {
  let i = 0;
  while (averageRating - 0.5 >= 0){
    i += 0.5;
    averageRating -= 0.5;
  }
  return i;
}

class ActionHistory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 1,
      recordAmount: 1,
      records: []
    }
  }

  componentDidMount() {
    readHistory(this.state.pageNumber, (response) => {
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
            <Rate allowHalf disabled defaultValue={scaleConverter(parseFloat(this.props.credibility))} />
            <h3>Your Credibility: <span style={{color: '#f49e42'}}>{this.props.credibility}</span></h3>
          </div>
        </div>
        <div style={divStyle}>
          <h3 style={titleStyle}>Action History</h3>
          <hr style={hrStyle} />
          {this.state.records.map((record, index) =>
            <div key={index}>
              <ActionRecord
                record={record}
              />
            </div>
          )}
          { this.state.recordAmount==0 &&
            <div>
              <p style={noRecordStyle}>== No Record ==</p>
            </div>
          }
          <div style={paginationStyle}>
            <Pagination
              defaultCurrent={this.state.pageNumber}
              pageSize={5}
              total={this.state.recordAmount}
              size='small'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ActionHistory
