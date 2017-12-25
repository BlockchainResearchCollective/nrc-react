import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { URL } from '../constants'
import { Row, Col } from 'antd'
import { updateEthBalance } from '../actions'

const logoStyle = {
  height: '40px',
  width: '40px',
  marginRight: '10px',
  float: 'right'
}
const logoutStyle ={
	color: '#fff',
	float: 'right',

}
const greetingStyle ={
	color: '#fff',
	fontSize: '14px',	
}
class HomeHeader extends React.Component{
	constructor(props){
		super(props)
		this.state = {

		}
	}

	componentWillMount() {
		const {profile, dispatch} = this.props
		dispatch(updateEthBalance(profile.ethAddress))
	}

	render(){
		const { profile } = this.props

		return(
			<div>
				<Row>
					<Col offset={0} span={8}>
						<span style={greetingStyle}>Hi, {profile.username}</span>
					</Col>
					<Col offset={8}>
						<img src={`${URL}/images/Logo_vector.svg`} style={logoStyle} alt="logo" />
						<a href='#' style={logoutStyle}>Log Out</a>
					</Col>
				</Row>
				<Row>
					<Col offset={0} span={8}>
						<span style={greetingStyle}>Balance: {this.props.ethBalance}Ether</span>
					</Col>
					<Col offset={8}>
						
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    isFetching: state.user.isFetching,
    ethBalance: state.user.ethBalance
  }
}

export default connect(mapStateToProps)(HomeHeader)