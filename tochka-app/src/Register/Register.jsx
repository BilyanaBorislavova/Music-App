import React, { Component } from 'react';
import './Register.css'

export default class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: null,
            password: null,
            email: null,
            fullName: null,
            profilePicture: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        })
    }

    render() {
        console.log(sessionStorage.getItem('username'))
        if(sessionStorage.getItem('username') !== null && sessionStorage.getItem('username') !== 'undefined'){
            window.location.href = 'http://localhost:3000';
            return;
        }
        return (
            <form className="register-form" onSubmit={(event) => {
                event.preventDefault();
                this.props.registerUser(this.state);
            }}>
                <div className="container">
                    <h1>Register</h1>
                    <p>Fill in this form to create an account.</p>
                    <hr />
                    <label htmlFor="username">Username</label> <br />
                    <input type="text" name="username" placeholder="Enter your username" onChange={this.handleChange} required></input> <br />

                    <label htmlFor="password">Password</label> <br />
                    <input type="password" name="password" placeholder="Enter your password" onChange={this.handleChange} required></input> <br />

                    <label htmlFor="email">Email</label> <br />
                    <input type="email" name="email" placeholder="Enter your email" onChange={this.handleChange} required></input> <br />

                    <label htmlFor="fullName">Full name</label> <br />
                    <input type="text" name="fullName" placeholder="Enter your full name" onChange={this.handleChange} required></input> <br />

                    <label htmlFor="profilePicture">Avatar</label> <br />
                    <input type="text" name="profilePicture" placeholder="Choose a profile picture" onChange={this.handleChange} required></input> <br />
                    <p>By creating an account you agree to our <a href="https://i.imgur.com/Q8ifRGK.jpg">Terms & Privacy</a>.</p>
                    <button type="submit" className="registerbtn">Register</button>
                </div>
                <div class="container signin">
                    <p>Already have an account? <a href="/login">Login</a>.</p>
                </div>
                <br/>
            </form>
        );
    }
}

