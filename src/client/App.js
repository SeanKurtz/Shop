import React, { Component } from 'react';
import './app.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import axios from 'axios';
import Navbar from './components/Navbar';
import ItemGrid from './components/ItemGrid';
import Login from './components/Login';

const Home = () => (
  <div className="container home">
    <h1>Welcome to Shop Administrator.</h1>
    <p>Check out the dashboard to get started editing items.</p>
  </div>
);
const Settings = () => <h1>Settings Page</h1>;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      failed: false,
      signUp: false,
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onLoginFormChanged = this.onLoginFormChanged.bind(this);
  }

  onLoginFormChanged(event) {
    const { signUp } = this.state;
    if (event.target.type === 'email') {
      this.setState({ email: event.target.value });
    } else if (event.target.type === 'password') {
      this.setState({ password: event.target.value });
    } else if (event.target.type === 'checkbox') {
      if (signUp) {
        console.log('Setting signUp to false');
        this.setState({ signUp: false });
      } else {
        console.log('Setting signUp to true');
        this.setState({ signUp: true });
      }
    } else {
      console.log('Login form was not changed. Error onLoginFormChanged(event).');
    }
  }

  signUp(event) {
    const { email, password } = this.state;
    event.preventDefault();
    console.log('Attempting to sign up...');
    axios.post('/api/signup', { email, password })
      .then((res) => {
        if (res.data.success) {
          console.log('Sign up success');
          this.setState({ loggedIn: true });
        }
        console.log('Sign up failure');
        this.setState({ loggedIn: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  login(event) {
    const { email, password } = this.state;
    event.preventDefault();
    console.log('Attempting to log in...');
    axios.post('/api/login', { email, password })
      .then((res) => {
        if (res.data.success) {
          console.log('Login success');
          this.setState({ loggedIn: true });
        } else {
          this.setState({ failed: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    const {
      loggedIn, signUp, email, password, failed
    } = this.state;
    return (
      <Router>
        <Navbar title="Shop Administrator" loggedIn={loggedIn} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />)
            }
          />
          <Route
            path="/login"
            render={() => (
              loggedIn ? <Redirect to="/home" /> : <Login failed={failed} loggedIn={loggedIn} email={email} password={password} onSubmit={signUp ? this.signUp : this.login} onChange={this.onLoginFormChanged} />

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
