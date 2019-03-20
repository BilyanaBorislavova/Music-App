import React, { Component } from 'react';
import './Login.css';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        })
    }

    render() {
        if(sessionStorage.getItem('username') !== null && sessionStorage.getItem('username') !== 'undefined'){
            window.location.href = 'http://localhost:3000';
            return;
        }
        return (
            <form className="login-form" onSubmit={(event) =>{ 
                event.preventDefault();
                this.props.loginUser(this.state);
            }}>
                <div className="container">
                    <h1>Login</h1>
                    <p>Fill in this form to login.</p>
                    <hr />
                    <label htmlFor="username">Username</label> <br />
                    <input type="text" name="username" placeholder="Enter your username" onChange={this.handleChange} required></input> <br />

                    <label htmlFor="password">Password</label> <br />
                    <input type="password" name="password" placeholder="Enter your password" onChange={this.handleChange} required></input> <br />
                    <button type="submit" className="loginbtn">Login</button>

                    <div className="container signin">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </div>
            </form>
        )
    }
}
