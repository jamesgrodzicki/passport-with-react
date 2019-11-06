import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-com';

import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import Home from './pages/home';
import Navbar from './pages/components/Navbar';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loggedin: false,
    username = null
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get('/api/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);

      if (response.data.user) {
        console.log('Get user: There is a user saved in the server session: ');
        this.setState({
          loggedin: true,
          username: response.data.user.username
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedin: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <div>hehe</div>
    );
  }
}

export default App;
