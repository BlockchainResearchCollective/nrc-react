import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { URL } from '../constants'
import { Row, Col, Menu, Dropdown, Icon } from 'antd'
import { updateEthBalance, logout } from '../actions'

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
	fontSize: '12px',
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

  handleLogout = () => {
    const {profile, dispatch} = this.props
		dispatch(logout())
  }

	componentWillMount(){
		const {profile, dispatch} = this.props
		dispatch(updateEthBalance(profile.ethAddress))
	}

	render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <a rel="noopener noreferrer" href="#"><Icon type="wallet" /> Wallet</a>
        </Menu.Item>
        <Menu.Item>
          <a rel="noopener noreferrer" href="#"><Icon type="book" /> History</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.handleLogout} rel="noopener noreferrer" href="#"><Icon type="logout" /> Logout</a>
        </Menu.Item>
      </Menu>
    )
		return(
			<div style={divStyle}>
				<Row>
					<Col offset={0} span={12}>
						<div style={greetingStyle}>Hi, {this.props.profile.username}</div>
            <div style={balanceStyle}>Balance: <span>{this.props.ethBalance}</span> Ether</div>
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
    profile: state.user.profile,
    ethBalance: state.user.ethBalance
  }
}

export default connect(mapStateToProps)(HomeHeader)
