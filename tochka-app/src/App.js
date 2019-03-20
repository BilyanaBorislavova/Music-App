import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastr";
import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Artist from './Create/Artist';
import Song from './Create/Song';
import ViewArtists from './View/ViewArtists';
import BanUsers from './View/BanUsers';
import MyPlaylist from './View/MyPlaylist';
import './App.css';

let container;
let redirect = window.location.href;
const port = 'http://localhost:3000';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      isAdmin: false,
      profilePicture: '',
      artists: [],
      username: '',
      fullname: '',
      email: '',
      myPlaylist: [],
      allUsers: []
    }
  }

  registerUser(user) {
    fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(data => {
        console.log(data.errors)
        if (data.errors) {
          data.errors.forEach(err => {
            container.error(<strong className="notice error">{err}</strong>)
          });
        } else {
          window.location.href = port;
          container.success(<strong className="notice success">User created successfully!</strong>)
        }
      })
  }

  componentDidMount() {
    if (sessionStorage.getItem('userId') !== "undefined" && sessionStorage.getItem('userId')) {
  
    fetch(`http://localhost:8000/auth/profile/${sessionStorage.getItem('userId')}`)
        .then(res  => res.json())
        .then(data => {

            this.setState({
              profilePicture: data.user.profilePicture,
              email: data.user.email,
              fullname: data.user.fullName,
              user: data.user.username
            })
        })

    fetch('http://localhost:8000/view/viewArtists')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          artists: [...this.state.artists, data.artists]
        })
      })

      fetch(`http://localhost:8000/view/myPlaylist/${sessionStorage.getItem('userId')}`)
          .then(res => res.json())
          .then(data => {
            console.log(data.songs)
            this.setState({
              myPlaylist: data.songs
            })
          })
          .catch(err => {
            console.log(err)
          })

          fetch('http://localhost:8000/view/getUsers')
              .then(res => res.json())
              .then(data => {
                this.setState({
                  allUsers: data.users
                })
              })
              .catch(err => {
                console.log(err);
              })
  }
}
  

  loginUser(user) {
    fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then((data) => {
        console.log(data)
        if (data.errors) {

        } else {
          this.setState({
            user: data.username
          })
          window.location.href = port;
          // console.log(data)
          container.success(<strong className="notice success">User logged in successfully!</strong>)
          sessionStorage.setItem('isAdmin', data.isAdmin);
          sessionStorage.setItem('userId', data.userId);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('profilePicture', data.profilePicture)
          sessionStorage.setItem('email', data.email)
          sessionStorage.setItem('fullname', data.fullName)
        }
      })
  }

  createArtist(info) {
    console.log(info)
    fetch('http://localhost:8000/create/createArtist', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then(res => res.json())
      .then(data => {
        window.location.href = port;
        container.success(<strong className="notice success">Artist created successfully!</strong>)
      }).catch(err => {
        container.error(<strong className="notice error">An error occurred!</strong>)
      })
  }

  createSong(song) {
    console.log(song)
    fetch('http://localhost:8000/create/createSong', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(song)
    }).then(res => res.json())
      .then(data => {
        window.location.href = port;
        container.success(<strong className="notice success">Song created successfully!</strong>)
      }).catch(err => {
        container.error(<strong className="notice error">An error occurred!</strong>)
      })
  }


  render() {
    return (
      
      <div>
        <Router>
          <div>
            <NavBar />
            <ToastContainer
              ref={ref => container = ref}
              className="toast-top-right"
            />
            <Switch>
              <Route path="/" exact render={() => <Home></Home>}></Route>
              <Route path="/createArtist" exact render={() => <Artist createArtist={this.createArtist.bind(this)}></Artist>}></Route>
              <Route path="/createSong" exact render={() => <Song 
              createSong={this.createSong.bind(this)}
              artists={this.state.artists}
              ></Song>}></Route>
              <Route path="/register" exact render={() => <Register registerUser={this.registerUser.bind(this)}></Register>}></Route>
              <Route path="/login" exact render={() => <Login loginUser={this.loginUser.bind(this)}></Login>}></Route>
              <Route path="/profile" exact render={() => <Profile 
              user={this.state.user}
              profilePicture={this.state.profilePicture}
              fullname={this.state.fullname}
              email={this.state.email}
              ></Profile>}></Route>
              <Route path="/viewArtists" exact render={() => <ViewArtists 
              artists={this.state.artists}
              getSongs={this.state.artists}
              />}></Route>
              <Route path="/myPlaylist" exact render={() => <MyPlaylist myPlaylist={this.state.myPlaylist}/>}></Route>
              <Route path="/banUsers" exact render={() => <BanUsers allUsers={this.state.allUsers}/>}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
