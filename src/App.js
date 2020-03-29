import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import CommunityContainer from './CommunityContainer'



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      user: ''
    }
  }


  // register method
  register = async (registerInfo) => {
    console.log(registerInfo);

    // define our url
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'
    try {
      // fetch api
      const registerResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // convert to json
      const registerJson = await registerResponse.json()
      console.log(registerResponse);
      if(registerJson.status === 200) {
        this.setState({loggedIn: true})
      }

    } catch(err) {
      console.error(err);
    }

  }


  // login method
  login = async (loginInfo) => {
    console.log("login method is being called");

    // define the url
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'
    try {
      // fetch api
      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const loginJson = await loginResponse.json()
      console.log(loginJson);

      if(loginJson.status === 200) {
        this.setState({loggedIn: true})
      }

    } catch(err) {
      console.error(err);
    }

  }



  render() {

    return (
    <div className="App">
      <h1>Social Community</h1>

      {this.state.loggedIn
        ? <CommunityContainer />
        : 
        <LoginRegisterForm 
          register={this.register}
          login={this.login}
        />

      }
    </div>
  )
  }
}

export default App;
