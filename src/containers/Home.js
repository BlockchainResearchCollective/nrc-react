import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Steps, Row, Col, Icon, Spin } from 'antd'
import HomeHeader from '../components/HomeHeader'
import HomeStoreName from '../components/HomeStoreName'
import HomeReviewList from '../components/HomeReviewList'
import CreateStore from '../components/CreateStore'
import NoStoreSelected from '../components/NoStoreSelected'
import WriteReview from '../components/WriteReview'
import Wallet from '../components/Wallet'
import ActionHistory from '../components/ActionHistory'
import { checkUrlStatus, getStoreNameFromUrl, getStoreIdFromUrl, searchImage } from '../service/util'
import { storeExist } from '../service/blockchain'

const addMarginTop = (offset) => ({
  marginTop: offset + 'px'
})

const writeReviewStyle = {
  margin: '30px'
}

const loadingStyle = {
  margin: '50px',
  textAlign: 'center'
}

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      display: 'loadingPage',
      storeSelected: false,
      storeURL: "",
      storeName: "Nanyang Review Chain",
      storeId: ""
    }
  }

  componentDidMount() {
    var url
    this.timer = setInterval( () => {
      if (window.location.href != url){
        url = window.location.href
        if (checkUrlStatus(url)){
          this.setState({
            storeSelected: true,
            storeName: getStoreNameFromUrl(url),
            storeId: getStoreIdFromUrl(url)
          }, () => {
            searchImage(this.state.storeName, url => {
              this.setState({
                storeURL: url,
              })
              /* update storeExist */
              /* update storeOverallScore */
              /* update reviewAmount */
              /* display: 'homePage' */
            })
          })
        } else {
          this.setState({
            storeSelected: true,
            storeExist: true,
            storeName: "Koufu @ the South Spine",
            storeId: "Koufu@theSouthSpine--1.342--103.682"
          }, () => {
            searchImage(this.state.storeName, url => {
              this.setState({
                storeURL: url,
                display: 'homePage'
              })
            })
          })
        }
      }
    },
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleHome = (e) => {
    e.preventDefault()
    this.setState({
      display: "homePage"
    })
  }
  handleWriteReview = (e) => {
    e.preventDefault()
    this.setState({
      display: "writeReviewPage"
    })
  }
  handleBack = (e) => {
    e.preventDefault()
    this.setState({
      display: "homePage"
    })
  }
  handleWallet = (e) => {
    e.preventDefault()
    this.setState({
      display: "walletPage"
    })
  }
  handleActionHistory = (e) => {
    e.preventDefault()
    this.setState({
      display: "actionHistoryPage"
    })
  }

  render() {
    return (
      <div>
        <HomeHeader
          email = {this.props.profile.email}
          handleHome = {this.handleHome}
          handleWallet = {this.handleWallet}
          handleActionHistory = {this.handleActionHistory}
        />
        { this.state.display === "homePage" &&
            <div>
              <HomeStoreName
                handleWriteReview = {this.handleWriteReview}
                handleBack = {this.handleBack}
                storeSelected={this.state.storeSelected}
                storeURL={this.state.storeURL}
                storeName={this.state.storeName}
                storeExist={this.props.storeExist}
                reviewAmount={this.props.reviewAmount}
                storeOverallScore={this.props.storeOverallScore}
                button='Write Review'
              />
              { this.state.storeSelected && this.props.storeExist &&
                <HomeReviewList
                  storeId={this.state.storeId}
                  reviewAmount={this.props.reviewAmount}
                />
              }
              { this.state.storeSelected && !this.props.storeExist &&
                <CreateStore
                  storeId={this.state.storeId}
                />
              }
              { !this.state.storeSelected &&
                <NoStoreSelected/>
              }
            </div>
        }
        { this.state.display === "writeReviewPage" &&
          <div>
            <HomeStoreName
              handleWriteReview = {this.handleWriteReview}
              handleBack = {this.handleBack}
              storeSelected={this.state.storeSelected}
              storeURL={this.state.storeURL}
              storeName={this.state.storeName}
              storeExist={this.props.storeExist}
              reviewAmount={this.props.reviewAmount}
              storeOverallScore={this.props.storeOverallScore}
              button='Back'
            />
            <div style={writeReviewStyle} >
              <WriteReview />
            </div>
          </div>
        }
        { this.state.display === "walletPage" &&
          <Wallet
            address={this.props.profile.ethAddress}
          />
        }
        { this.state.display === "actionHistoryPage" &&
          <ActionHistory
            credibility={4}
          />
        }
        {
          this.state.display === "loadingPage" &&
          <div style={loadingStyle}>
            <Spin size="large" />
          </div>
        }
      </div>
    )
  }
}

export default connect()(Home)
