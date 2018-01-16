import React from 'react'
import { connect } from 'react-redux'
import { Spin, Icon } from 'antd'
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
import { URL } from '../constants'

const writeReviewStyle = {
  margin: '30px'
}
const loadingStyle = {
  margin: '50px',
  textAlign: 'center'
}
const logoStyle = {
  height: '80px',
  width: '80px',
  margin: '10px'
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
        if (this.state.display === "writeReviewPage"){
          this.setState({
            display: "homePage"
          })
        }
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

  handleRefresh = (e) => {
    e.preventDefault()
    this.props.dispatch(initialize(window.location.href, this.props.profile.ethAddress))
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
          handleRefresh = {this.handleRefresh}
          handleHome = {this.handleHome}
          handleWallet = {this.handleWallet}
          handleActionHistory = {this.handleActionHistory}
          isReady = {this.props.isReady}
        />
        { this.props.isReady && this.state.display === "homePage" &&
            <div>
              <HomeStoreName
                handleWriteReview = {this.handleWriteReview}
                storeSelected={this.props.storeSelected}
                storeURL={this.props.storeURL}
                storeName={this.props.storeName}
                storeExist={this.props.storeExist}
                reviewAmount={this.props.reviewAmount}
                storeOverallScore={this.props.storeOverallScore}
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
            <div style={{textAlign:'center'}}>
              <span onClick={this.handleBack} style={{color:'#ffdc85', cursor:'pointer', fontSize:'20px'}}>
                <Icon type="arrow-left" /> {this.props.storeName}
              </span>
            </div>
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
            <div>
              <img src={`${URL}/images/Icon_refreshingleft.svg`} style={logoStyle} alt="logo" />
              <span style={{fontSize: '12px', color: 'white'}}>Loading...</span>
              <img src={`${URL}/images/Icon_refreshingright.svg`} style={logoStyle} alt="logo" />
            </div>
            <Spin size="large" />
          </div>
        }
        {
          this.props.isProcessing &&
          <div style={loadingStyle}>
            <img src={`${URL}/images/Icon_refreshingleft.svg`} style={logoStyle} alt="logo" />
            <span style={{fontSize: '12px', color: 'white'}}>Processing...</span>
            <img src={`${URL}/images/Icon_refreshingright.svg`} style={logoStyle} alt="logo" />
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
