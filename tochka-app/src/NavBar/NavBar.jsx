import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

export default class NavBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            user: null
        }
    }

    render(){
        return (
            <header>
                <ul>                
                    <li>                    
                        <Link to="/">Music App</Link>
                    </li>

                    {
                        sessionStorage.getItem('token')?
                          <li>
                              <li>
                                  <Link to="/">Welcome, {sessionStorage.getItem('username')}!</Link>
                              </li>
                        
                              <li>
                                  <Link to="/createArtist">Create Artist</Link>
                              </li>
                          </li>
                          :
                          <li>
                              <li>
                              <Link to="/register">Register</Link>
                              </li>
                              <li>
                                  <Link to="/login">Login</Link>
                              </li>
                          </li>
                    }
                    </ul>
            </header>
        );
    }
}