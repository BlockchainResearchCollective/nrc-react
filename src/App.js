import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './containers/Login'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      url: "",
      user: {},
      status: "success"
    }
  }

  componentDidMount() {
    this.setState({ status: "fail" })
  }

  render() {
    return (
      <Login />
    )
  }
}

export default App
