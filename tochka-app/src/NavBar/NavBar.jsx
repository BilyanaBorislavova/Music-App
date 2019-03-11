import React, {Component} from 'react';
import './NavBar.css';
import Admin from './Admin';
import Null from './Null';
import User from './User';

export default class NavBar extends Component {
    render(){
        if(sessionStorage.getItem('isAdmin') === 'true') {
            return (
                <Admin/>
            );
        } else if (sessionStorage.getItem('isAdmin') === 'false'){
            return(
                <User/>
            );
        } 
        return (
            <Null/>
        )
    }
}