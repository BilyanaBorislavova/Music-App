import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export default class Null extends Component {
    render() {
        return (
            <header>
                <ul>
                    <li>
                        <Link to="/">Music App</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </header>
        );
    }
}