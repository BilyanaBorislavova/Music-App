import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <form className="login-form">
                <div className="container">
                    <h1>Login</h1>
                    <p>Fill in this form to login.</p>
                    <hr />
                    <label htmlFor="username">Username</label> <br />
                    <input type="text" name="username" placeholder="Enter your username" required></input> <br />

                    <label htmlFor="password">Password</label> <br />
                    <input type="password" name="password" placeholder="Enter your password" required></input> <br />
                    <button type="submit" className="loginbtn">Register</button>

                    <div className="container signin">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </div>
            </form>
        )
    }
}
