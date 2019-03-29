import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from "../../../services/authentication";
import swal from 'sweetalert';
import { Consumer, defaultState } from '../../../context/user-context';
import './Register.css'

export default class Register extends Component {
    static service = new AuthenticationService();
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            email: '',
            fullName: '',
            profilePicture: '',
            message: '',
            registeredSuccessfully: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { username, password, email, fullName, profilePicture } = this.state;
        const credentials = { username, password, email, fullName, profilePicture };

        if(username.length < 3) {
            swal({text: "Username must be at least 3 characters long", dangerMode: true})
            return;
        }

        if(username.length > 13){
            swal({text: "Username cannot be more than 13 characters long", dangerMode: true})
            return;
        }

        if(password.length < 3) {
            swal({text: "Password must be at least 3 characters long", dangerMode: true})
            return;
        }

        if(!profilePicture.startsWith('https')){
            swal({text: "Please, add a valid profile picture", dangerMode: true})
            return;
        }

        try {
            const user = await Register.service.register(credentials);
            console.log(user)
            this.setState({
                message: user.message,
                registeredSuccessfully: true,
                userId: user.userId
            })
        } catch (err) {
            this.setState({
                message: err.message
            })
        }
    }



    render() {
        const {message, registeredSuccessfully} = this.state;

        if(registeredSuccessfully) {
            swal(message)
            return <Redirect to="/login"></Redirect>
        }
     
        return (
            <form className="register-form" onSubmit={this.handleSubmit}>
                <div className="container">
                    <h1>Register</h1>
                    <p>Fill in this form to create an account.</p>
                    {message.length ? <div>{message}</div> : null}
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
                <br />
            </form>
        );
    }
}

