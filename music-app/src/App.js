import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import swal from 'sweetalert';
import Home from "./components/Home/Home";
import NavBarContext from "./components/NavBar/NavBar";
import Register from "./components/Anonymous/Register/Register";
import LoginContext from "./components/Anonymous/Login/Login";
import Artist from './components/Admin/Create/Artist';
import Song from './components/Admin/Create/Song';
import BanUsers from './components/Admin/Delete/BanUsers';
import ProfileContext from './components/Profile/Profile';
import Admin from './components/Routes/Admin';
import User from './components/Routes/User';
import AdminAndUser from './components/Routes/UserAndAdmin';
import Anonymous from './components/Routes/Anon';
import { Provider, defaultState } from "./context/user-context";
import "./App.css";
import ViewArtists from "./components/User/ViewArtists";
import ViewSongs from "./components/User/ViewSongs";
import MyPlaylist from "./components/User/MyPlaylist";
import { isError } from "util";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ...defaultState,
        updateUser: this.updateUser
      }
    };
  }

  updateUser = user => {
    console.log(user)
    this.setState({
      user
    });
  };

   logout(event){
    event.preventDefault();
    window.sessionStorage.removeItem("auth_token");
    window.location.href = '/'
    swal('User logged out successfully!')
  }

  render() {
    const { user } = this.state;
    
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Provider value={user}>
              <NavBarContext logout={this.logout} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
              <Switch>
                <Route path="/" exact component={Home} />
                <Anonymous path="/register" exact component={Register} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <Anonymous path="/login" exact component={LoginContext} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <Admin path="/createArtist" exact component={Artist} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <Admin path="/createSong" exact component={Song} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <Admin path="/banUsers" exact component={BanUsers} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <User path="/viewArtists" exact component={ViewArtists} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <AdminAndUser path="/profile" exact component={ProfileContext} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <User path="/viewSongs" exact component={ViewSongs} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <User path="/myPlaylist" exact component={MyPlaylist} isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                <AdminAndUser path="/logout" isLoggedIn={user.isLoggedIn} isAdmin={user.isAdmin}/>
                </Switch>
            </Provider>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
