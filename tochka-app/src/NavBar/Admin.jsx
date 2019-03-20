import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

export default class AdminNavBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: null
        }
    }

    logout(event) { 
        event.preventDefault();
           sessionStorage.removeItem('token');
           sessionStorage.removeItem('username');
           sessionStorage.removeItem('isAdmin');
           sessionStorage.removeItem('profilePicture');
           sessionStorage.removeItem('userId');
           sessionStorage.removeItem('email')
           sessionStorage.removeItem('fullname')
           this.setState({
               user: null
           })
           window.location.href = 'http://localhost:3000';
      }

    render() {
        return (
            <header>
                <ul>                
                    <li>                    
                        <Link to="/">Music App</Link>
                    </li>
                       <div>
                             <li>
                                  <Link to="/profile">Welcome, {sessionStorage.getItem('username')}!</Link>
                              </li>
                        
                              <li>
                                  <Link to="/createArtist">Add Artist</Link>
                              </li>

                              <li>
                                  <Link to="/createSong">Add Song</Link>
                              </li>
                              <li>
                                  <Link to="/banUsers">Ban Users</Link>
                              </li>
                              <li>
                                  <Link to="/logout" onClick={this.logout.bind(this)}>Logout</Link>
                              </li>
                              </div>
                    </ul>
            </header>
        );
    }
}