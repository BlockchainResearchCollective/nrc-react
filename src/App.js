import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Login from './containers/Login'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    )
  }
}

export default App
