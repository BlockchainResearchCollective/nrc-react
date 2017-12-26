import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Steps, Row, Col, Icon } from 'antd'
import HomeHeader from '../components/HomeHeader'
import HomeStoreName from '../components/HomeStoreName'
import HomeReviewList from '../components/HomeReviewList'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl } from '../service/util'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      storeSelected: true,
      storeExist: true,
      storeName: "Nanyang Review Chain",
      storeId: "",
      storeOverallScore: 0,
      reviewAmount: 10
    }
  }

  componentDidMount() {
    const url = window.location.href
    if (checkUrlStatus(url)){
      console.log(true)
    } else {
      console.log(false)
    }
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
        { this.state.storeSelected && this.state.storeExist &&
          <HomeReviewList
            storeId={this.state.storeId}
            reviewAmount={this.state.reviewAmount}
          />
        }
      </div>
    )
  }
}

export default connect()(Home)
