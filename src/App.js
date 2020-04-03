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

      if(registerJson.status === 200) {
        this.setState({
          loggedIn: true,
          user: registerJson.data
        })
      }

    } catch(err) {
      console.error(err);
    }

  }


  // login method
  login = async (loginInfo) => {

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


      if(loginJson.status === 200) {
        this.setState({
          loggedIn: true,
          user: loginJson.data
        })
      }

    } catch(err) {
      console.error(err);
    }

  }



  render() {

    return (
    <div className="App">
      {this.state.loggedIn?
        <CommunityContainer user={this.state.user}/>
        :
        <LoginRegisterForm 
          register={this.register}
          login={this.login}
          loggedIn={this.state.loggedIn}
        />
        
      }
          

    </div>
  )
  }
}

export default App;
