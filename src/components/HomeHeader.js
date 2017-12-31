import React from 'react'
import { connect } from 'react-redux'
import { URL } from '../constants'
import { Row, Col, Menu, Dropdown, Icon } from 'antd'
import { logout, updateEthBalance } from '../actions'

const divStyle = {
  padding: '15px',
  paddingLeft: '30px'
}
const greetingStyle ={
	color: '#fff',
	fontSize: '22px',
}
const balanceStyle ={
	color: '#fff',
	fontSize: '14px',
  fontFamily: 'Open Sans',
}
const warningStyle ={
	color: 'red',
	fontSize: '16px',
  fontFamily: 'Open Sans',
}
const logoStyle = {
  height: '40px',
  width: '40px',
  marginRight: '10px'
}
const dropdownStyle = {
  zIndex: '100000',
  color: '#4c475e'
}

class HomeHeader extends React.Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}

  handleLogout = (e) => {
    e.preventDefault()
		this.props.dispatch(logout())
  }

  componentWillMount(){
    this.props.dispatch(updateEthBalance(this.props.ethAddress))
  }

	render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.props.handleHome} rel="noopener noreferrer" href="#"><Icon type="home" /> Home</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.props.handleWallet} rel="noopener noreferrer" href="#"><Icon type="wallet" /> Wallet</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.props.handleActionHistory} rel="noopener noreferrer" href="#"><Icon type="book" /> History</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleLogout} rel="noopener noreferrer" href="#"><Icon type="logout" /> Logout</a>
        </Menu.Item>
      </Menu>
    )
		return(
			<div style={divStyle}>
				<Row>
					<Col offset={0} span={19}>
						<div style={greetingStyle}><a onClick={this.props.handleHome} href="#"><Icon type="home" /></a> Hi, {this.props.username}</div>
            { this.props.email && this.props.isReady && this.props.ethBalance >= 0.05 &&
              <div style={balanceStyle}>Balance: <span>{this.props.ethBalance.toFixed(5)}</span> Ether</div>
            }
            { this.props.email && this.props.isReady && this.props.ethBalance < 0.05 &&
              <div style={balanceStyle}>Balance: <span>{this.props.ethBalance.toFixed(5)}</span> Ether <span style={warningStyle}>(Insufficient)</span></div>
            }
            { !this.props.email &&
              <div style={warningStyle}>Unverified Account</div>
            }
					</Col>
					<Col offset={19}>
            <a className="ant-dropdown-link" href="#">
              <Dropdown overlay={menu} overlayStyle={dropdownStyle}>
                <div>
                  <img src={`${URL}/images/Logo_vector.svg`} style={logoStyle} alt="logo" />
                  <Icon type="menu-fold" />
                </div>
              </Dropdown>
            </a>
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    username: state.user.profile.username,
    ethAddress: state.user.profile.ethAddress,
    ethBalance: state.user.ethBalance
  }
}

export default connect(mapStateToProps)(HomeHeader)
