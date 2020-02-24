import React, { Component } from 'react';
import './app.css';

import {
  BrowserRouter as Router, Switch, Route, Redirect
} from 'react-router-dom';


import axios from 'axios';
import Navbar from './components/Navbar';
import ItemGrid from './components/ItemGrid';
import Login from './components/Login';

const Home = () => (<h1>Home Page</h1>);
const Settings = () => (<h1>Settings Page</h1>);


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
    this.onLoginFormChanged = this.onLoginFormChanged.bind(this);
  }

  onLoginFormChanged(event) {
    if (event.target.type === 'email') {
      this.setState({ email: event.target.value });
    } else if (event.target.type === 'password') {
      this.setState({ password: event.target.value });
    } else {
      console.log('Errorrrr');
    }
  }

  login(event) {
    event.preventDefault();
    console.log('Attempting to log in...');
    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        if (res.data.success) {
          console.log('Log in success.');
          this.setState({ loggedIn: true });
        } else {
          console.log('Log in failure.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { loggedIn, email, password } = this.state;
    return (
      <Router>
        <Navbar title="Shop Administrator" loggedIn={loggedIn} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              loggedIn ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/login" />
              )
            )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                loggedIn={loggedIn}
                email={email}
                password={password}
                onSubmit={this.login}
                onChange={this.onLoginFormChanged}
              />
            )}
          />
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={ItemGrid} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Router>
    );
  }
}
