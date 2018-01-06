import React from 'react'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import HomeHeader from '../components/HomeHeader'
import HomeStoreName from '../components/HomeStoreName'
import HomeReviewList from '../components/HomeReviewList'
import CreateStore from '../components/CreateStore'
import NoStoreSelected from '../components/NoStoreSelected'
import WriteReview from '../components/WriteReview'
import Wallet from '../components/Wallet'
import ActionHistory from '../components/ActionHistory'
import { initialize, decryptKey, initializeEnd } from '../actions'
import { checkUrlStatus, getStoreIdFromUrl } from '../service/util'

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
      display: 'homePage'
    }
  }

  componentDidMount() {
    var storeId
    var url
    this.timer = setInterval( () => {
      if (checkUrlStatus(window.location.href) && getStoreIdFromUrl(window.location.href) !== storeId){
        storeId = getStoreIdFromUrl(window.location.href)
        this.props.dispatch(initialize(window.location.href, this.props.profile.ethAddress))
      } else if (url != window.location.href){
        url = window.location.href
        this.props.dispatch(initializeEnd())
      }
    },
      3000
    )
    decryptKey(this.props.profile.ethAddress, this.props.profile.encryptedAccount, this.props.profile.hashedPassword)
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
          isReady = {this.props.isReady}
        />
        { this.props.isReady && this.state.display === "homePage" &&
            <div>
              <HomeStoreName
                handleWriteReview = {this.handleWriteReview}
                handleBack = {this.handleBack}
                storeSelected={this.props.storeSelected}
                storeURL={this.props.storeURL}
                storeName={this.props.storeName}
                storeExist={this.props.storeExist}
                reviewAmount={this.props.reviewAmount}
                storeOverallScore={this.props.storeOverallScore}
                button='Write Review'
              />
              { !this.props.isProcessing && this.props.storeSelected && this.props.storeExist && this.props.reviewReady &&
                <HomeReviewList/>
              }
              { !this.props.isProcessing && this.props.storeSelected && this.props.storeExist && !this.props.reviewReady &&
                <div style={loadingStyle}>
                  <Spin size="large" />
                </div>
              }
              { !this.props.isProcessing && this.props.storeSelected && !this.props.storeExist &&
                <CreateStore
                  storeId={this.props.storeId}
                  storeName={this.props.storeName}
                  ethAddress={this.props.profile.ethAddress}
                />
              }
              { !this.props.isProcessing && !this.props.storeSelected &&
                <NoStoreSelected/>
              }
            </div>
        }
        { this.props.isReady && this.state.display === "writeReviewPage" &&
          <div>
            <HomeStoreName
              handleWriteReview = {this.handleWriteReview}
              handleBack = {this.handleBack}
              storeSelected={this.props.storeSelected}
              storeURL={this.props.storeURL}
              storeName={this.props.storeName}
              storeExist={this.props.storeExist}
              reviewAmount={this.props.reviewAmount}
              storeOverallScore={this.props.storeOverallScore}
              button='Back'
            />
            { !this.props.isProcessing &&
              <div style={writeReviewStyle} >
                <WriteReview
                  storeId={this.props.storeId}
                  storeName={this.props.storeName}
                  ethAddress={this.props.profile.ethAddress}
                  handleBack={this.handleBack}
                />
              </div>
            }
          </div>
        }
        { this.props.isReady && this.state.display === "walletPage" &&
          <Wallet
            address={this.props.profile.ethAddress}
          />
        }
        { this.props.isReady && this.state.display === "actionHistoryPage" &&
          <ActionHistory
            credibility={this.props.credibility}
          />
        }
        {
          !this.props.isReady &&
          <div style={loadingStyle}>
            <Spin size="large" />
          </div>
        }
        {
          this.props.isProcessing &&
          <div style={loadingStyle}>
            <Spin size="large" />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    isReady: state.transaction.isReady,
    isProcessing: state.transaction.isProcessing,
    storeSelected: state.transaction.storeSelected,
    storeExist: state.transaction.storeExist,
    storeURL: state.transaction.storeURL,
    storeName: state.transaction.storeName,
    storeId: state.transaction.storeId,
    storeOverallScore: state.transaction.storeOverallScore,
    reviewAmount: parseInt(state.transaction.reviewAmount, 10),
    credibility: state.transaction.credibility,
    reviewReady: state.transaction.reviewReady
  }
}

export default connect(mapStateToProps)(Home)
