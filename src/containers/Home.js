import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Steps, Row, Col, Icon } from 'antd'
import HomeHeader from '../components/HomeHeader'
import HomeStoreName from '../components/HomeStoreName'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      storeSelected: false,
      storeExist: false,
      storeName: "Nanyang Review Chain",
      storeId: "",
      storeOverallScore: 0,
      reviewAmount: 0,
      reviewPageNumber: 1,
    }
  }

  componentDidMount() {
    let url = window.location.href
    console.log(url)
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <HomeHeader />
        <HomeStoreName
          storeSelected={this.state.storeSelected}
          storeExist={this.state.storeExist}
          storeName={this.state.storeName}
          reviewAmount={this.state.reviewAmount}
          storeOverallScore={this.state.storeOverallScore}
          />
        <HomeReviewList />
      </div>
    )
  }
}

export default connect()(Home)
