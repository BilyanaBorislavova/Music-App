import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastr";
import NavBar from './NavBar/NavBar'
import Register from './Register/Register';
import Login from './Login/Login';
import './App.css';

let container;
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      isAdmin: false
    }
  }

  registerUser(user) {
    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          data.errors.forEach(err => {
            container.error(err)
          });
        } else {
          container.success(<strong>User created successfully!</strong>)
        }
      })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />
            <ToastContainer
              ref={ref => container = ref}
              className="toast-top-left"
            />
            <Switch>
              <Route path="/" exact></Route>
              <Route path="/createArtist" exact></Route>
              <Route path="/register" exact render={() => <Register registerUser={this.registerUser.bind(this)}></Register>}></Route>
              <Route path="/login" exact render={() => <Login></Login>}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
