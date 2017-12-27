import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Steps, Row, Col, Icon } from 'antd'
import HomeHeader from '../components/HomeHeader'
import HomeStoreName from '../components/HomeStoreName'
import HomeReviewList from '../components/HomeReviewList'
import CreateStore from '../components/CreateStore'
import NoStoreSelected from '../components/NoStoreSelected'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl, searchImage } from '../service/util'
import { storeExist } from '../service/blockchain'

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      storeSelected: false,
      storeExist: false,
      storeURL: "",
      storeName: "Nanyang Review Chain",
      storeId: "",
      storeOverallScore: 0,
      reviewAmount: 0
    }
  }

  componentDidMount() {
    const url = window.location.href
    if (checkUrlStatus(url)){
      this.setState({
        storeSelected: true,
        storeName: getStoreNameFromUrl(url),
        storeId: getStoreIdFromUrl(url)
      }, () => {
        searchImage(this.state.storeName, url => {
          this.setState({
            storeURL: url
          })
        })
        /* update storeExist */
        /* update storeURL */
        /* update storeOverallScore */
        /* update reviewAmount */
      })
    } else {
      this.setState({
        storeSelected: true,
        storeExist: true,
        storeName: "NTU Canteen B",
      }, () => {
        searchImage(this.state.storeName, url => {
          this.setState({
            storeURL: url
          })
        })
      })
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
          storeURL={this.state.storeURL}
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
        { this.state.storeSelected && !this.state.storeExist &&
          <CreateStore
            storeId={this.state.storeId}
          />
        }
        { !this.state.storeSelected &&
          <NoStoreSelected/>
        }
      </div>
    )
  }
}

export default connect()(Home)
