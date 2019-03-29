import React from 'react';
import {Consumer} from '../../context/user-context'
import './Profile.css';
  
const Profile = (user) => {
    return (
        <div>
            <h1>Profile</h1> 
            <p>My profile page</p>
            <hr/>
            <h2>Welcome, {user.username}!</h2>
            <img src={user.profilePicture}></img>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
        </div>
    );
}

const ProfileContext = (props) => {
    return (
        <Consumer>
            {
                (user) => (
                    <Profile {...props} 
                    username={user.username}
                    profilePicture={user.profilePicture}
                    fullName={user.fullName}
                    email={user.email}/>
                )
            }
        </Consumer>
    )
}

export default ProfileContext;
