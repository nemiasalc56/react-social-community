import React, { Component } from 'react';
import './App.css';
import LoginRegisterForm from './LoginRegisterForm'
import CommunityContainer from './CommunityContainer'




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      user: '',
      message: ''
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
          user: registerJson.data,
          message: ''
        })
      } else {
        this.setState({message: 'Username already exists'})
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
          user: loginJson.data,
          message: ''
        })
      } else {
        this.setState({message: 'Username or password is incorrect'})
      }

    } catch(err) {
      console.error(err);
    }

  }

  
  logout = async () => {
    // url to fetch
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/logout'

    try {
      const logoutResponse = await fetch(url, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const logoutJson = await logoutResponse.json()

      // if the status is 200 it was successful
      if(logoutJson.status === 200) {
        this.setState({
          loggedIn: false,
          user: ''
        })
      }

    } catch(err) {
      console.error(err);
    }
  }

  deleteAccount = async () => {
    console.log("user is trying to delete the account");
    // url to fetch
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/' + this.state.user.id

    try {
      const deleteAccountResponse = await fetch(url, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const deleteAccountJson = await deleteAccountResponse.json()

      // if the status is 200 it was successful
      if(deleteAccountJson.status === 200) {
        this.setState({
          loggedIn: false,
          user: ''
        })
      }


    } catch(err) {
      console.error(err);
    }

  }

  // clear message on state
  clearMessage = () => {
    this.setState({message: ''})
  }

  render() {

    return (
    <div className="App">
      {this.state.loggedIn?
        <CommunityContainer 
          user={this.state.user}
          logout={this.logout}
          deleteAccount={this.deleteAccount}
          />
        :
        <LoginRegisterForm 
          clearMessage={this.clearMessage}
          message={this.state.message}
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
