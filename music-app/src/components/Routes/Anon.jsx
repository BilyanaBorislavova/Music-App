import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const Anonymous = ({ component: Component, isAdmin, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default Anonymous