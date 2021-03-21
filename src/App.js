
import React, { Component } from 'react'

import './assets/global.scss'
import Main from './views/Main.js'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
            <Main></Main>
        </div>
          
      </div>
    )
  }
}

export default App
