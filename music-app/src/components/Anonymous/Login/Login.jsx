import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';
import AuthenticationService from "../../../services/authentication";
import { Consumer, defaultState } from "../../../context/user-context";
import "./Login.css";

class Login extends Component {
  static service = new AuthenticationService();

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const credentials = { username, password };
    const { updateUser } = this.props;

    try {
      const user = await Login.service.login(credentials);
      if(user.message === 'User successfully logged in!'){
      window.sessionStorage.setItem("auth_token", user.token);
      window.sessionStorage.setItem("userId", user.userId);
      updateUser({
        isLoggedIn: true,
        ...user
      });
      swal(`User ${username} successfully logged in!`)
     
    } else {
      swal({text:'Please, fill in the fields with correct information', dangerMode: true})
    }

    } catch (err) {
      this.setState({
        error: err.message
      });
      swal(err.message)
    }
  };

  render() {
    const { username, password, error } = this.state;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className="container">
          <h1>Login</h1>
          <p>Fill in this form to login.</p>
          {error.length ? <div>{error}</div> : null}
          <hr />
          <label htmlFor="username">Username</label> <br />
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={this.handleChange}
            required
          />{" "}
          <br />
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleChange}
            required
          />{" "}
          <br />
          <button type="submit" className="loginbtn">
            Login
          </button>
          <div className="container signin">
            <p>
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </form>
    );
  }
}

const LoginContext = (props) => {
  return (
    <Consumer>
      {
          (user) => (
              <Login
              {...props}
              isLoggedIn={user.isLoggedIn}
              updateUser={user.updateUser}
              />
          )
      }
    </Consumer>
  );
};

export default LoginContext;
