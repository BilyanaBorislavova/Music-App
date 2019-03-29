import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

const User = ({ component: Component, isAdmin, isLoggedIn, ...rest }) => (
    <Route {...rest} render={props => (
      !isAdmin && isLoggedIn ? (
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

  export default User