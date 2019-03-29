import React from "react";
import { NavLink } from "react-router-dom";
import { Consumer, defaultState } from "../../context/user-context";
import "./NavBar.css";

const NavBar = props => {
  const { isLoggedIn, username, logout, isAdmin } = props;
  console.log(props)
  if (!isLoggedIn && !isAdmin) {
    return (
      <header>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Music App
          </NavLink>
        </li>
      <div>
        <li>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
      </div>
      </ul>
      </header>
    );
  }

  return (
    <header>
      <ul>
        <li>
          <NavLink to="/" activeClassName="active">
            Music App
          </NavLink>
        </li>
        {!isAdmin ? (
          <div>
            <li>
              <NavLink to="/profile">Welcome, {username}!</NavLink>
            </li>

            <li>
              <NavLink to="/viewArtists">View Artists</NavLink>
            </li>
            <li>
              <NavLink to="/myPlaylist">My Playlist</NavLink>
            </li>
            <li>
            <a href='javascript:void(0)' onClick={logout}>Logout</a>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <NavLink to="/profile" activeClassName="active">
                Welcome, {username}!
              </NavLink>
            </li>

            <li>
              <NavLink to="/createArtist" activeClassName="active">
                Add Artist
              </NavLink>
            </li>

            <li>
              <NavLink to="/createSong" activeClassName="active">
                Add Song
              </NavLink>
            </li>
            <li>
              <NavLink to="/banUsers" activeClassName="active">
                Ban Users
              </NavLink>
            </li>
            <li>
            <a href='javascript:void(0)' onClick={logout}>Logout</a>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
};

const NavBarContext = props => {
  return (
    <Consumer>
      {user => (
        <NavBar {...props} isAdmin={user.isAdmin} username={user.username} />
      )}
    </Consumer>
  );
};

export default NavBarContext;
