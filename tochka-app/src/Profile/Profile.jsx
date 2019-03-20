import React, {Component} from 'react';
import './Profile.css';

export default class Profile extends Component {

    render() {
        return (
            <div>
                <h1>Profile</h1> 
                <p>My profile page</p>
                <hr/>
                <h2>Welcome, {this.props.user}!</h2>
                <img src={this.props.profilePicture}></img>
                <p>{this.props.fullname}</p>
                <p>{this.props.email}</p>
            </div>
        );
    }
}
