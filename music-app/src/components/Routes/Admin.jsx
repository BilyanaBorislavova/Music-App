import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Consumer} from '../../context/user-context';

const Admin = ({ component: Component, isAdmin, ...rest }) => (
    <Route {...rest} render={props => (
      isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
    )
    } />
  )
  
 



export default Admin
