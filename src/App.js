import React, { Component } from 'react';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      user: ''
    }
  }


  // register method
  register = (registerInfo) => {

    console.log("this is the register method being called");
  }



  render() {

    return (
    <div className="App">
      <h1>Social Community</h1>
    </div>
  )
  }
}

export default App;
