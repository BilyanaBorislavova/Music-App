import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import AuthenticationService from "../../services/authentication";

export default class ViewSongs extends Component {
  static service = new AuthenticationService();

  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  async addToPlaylist(event) {
    event.preventDefault();
    const { name, title } = event.target;
    try {
      const song = await ViewSongs.service.addToPlaylist(name, title);
      if (song.message === "Song already exists in the playlist!") {
        swal({ text: song.message, dangerMode: true });
      } else {
        swal(song.message);
      }
      this.setState({
        clicked: true
      });
    } catch (err) {
      swal(err);
    }
  }

  render() {
    const { clicked } = this.state;

    if (clicked) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {this.props.songs.map(song => {
          return (
            <div key={song.id}>
              <h1>{song.name}</h1>
              <p>{song.lyrics}</p>
              <button
                className="anotherSpecialBtn"
                name={song.id}
                title={window.sessionStorage.getItem("userId")}
                onClick={this.addToPlaylist.bind(this)}
              >
                Add to Playlist
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
