import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import AuthenticationService from '../../../services/authentication'
import './Style.css';

export default class Song extends Component {
    static service = new AuthenticationService();

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lyrics: '',
            artist: '',
            artists: [],
            message: '',
            createdSuccessfully: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentWillMount() {
      const artists = await Song.service.getAllArtists();
      this.setState({
        artists: artists.artists
      })        
    }

    handleClick(event) {
        event.preventDefault();
        const { name, id, title } = event.target;
        this.setState({
            [name]: id
        })
        document.getElementById('chooseArtist').innerText = title;
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {name, lyrics, artist} = this.state;
        const song = {name, lyrics, artist};

        if(!artist){
            swal({text: 'Please, select an artist', dangerMode: true})
            return;
        }

        if(name.length === 0){
            swal({text: 'Please, write a valid song name', dangerMode: true})
            return;
        }

        if(lyrics.length < 150) {
            swal({text: 'Please, fill in the whole lyrics of the song', dangerMode: true})
            return;
        }

        try {
            const createSong = await Song.service.createSong(song);
            this.setState({
                message: createSong.message,
                createdSuccessfully: true
            })
        } catch(err) {
            console.log(err)
        }
    }

    render() {
        const {artists, message, createdSuccessfully} = this.state;

        if(createdSuccessfully) {
            swal(message)
            return <Redirect to="/"></Redirect>
        }
        return (
          <form className="create-form" onSubmit={this.handleSubmit}>
              <div className="container">
                  <h1>Add Song</h1> <br />
                  <p>Fill in this form to create a song.</p> <hr />
                  <div className="dropdown">
                      <button className="dropbtn" id="chooseArtist">Select Artist</button>
                      <div className="dropdown-content">
                          {artists.map(artist => {
                              return <a href={artist.name} key={artist._id} name="artist" id={artist._id} title={artist.name} onClick={this.handleClick}>{artist.name}</a>
                          })}
                      </div>
                  </div> <br/> <br/>
                  <label htmlFor="name">Name</label> <br />
                  <input type="text" name="name" placeholder="Song name" onChange={this.handleChange} required></input> <br />
                  <label htmlFor="lyrics">Lyrics</label> <br />
                  <textarea type="text" name="lyrics" placeholder="Add lyrics" onChange={this.handleChange}></textarea> <br />
                  <button type="submit" className="btn">Add Song</button>
              </div>
          </form>
        );
    }
}