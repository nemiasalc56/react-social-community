import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'



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

      <LoginRegisterForm 
        register={this.register}
      />
    </div>
  )
  }
}

export default App;
