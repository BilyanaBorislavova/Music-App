import React, { Component } from 'react';
import AuthenticationService from '../../services/authentication';
import './View.css';
import ViewSongs from './ViewSongs';

export default class ViewArtists extends Component {
    static service = new AuthenticationService();

    constructor(props) {
        super(props)

        this.state = {
            songs: [],
            showSongs: false,
            artists: [],
            clicked: false
        }
    }

    async componentWillMount() {
        const artists = await ViewArtists.service.getAllArtists();
        this.setState({
          artists: artists.artists
        })        
      }

    async getArtistSongs(event) {
        event.preventDefault();

        //artist id 
        const { name } = event.target;
        const artist = await ViewArtists.service.getArtist(name);
        this.setState({
            songs: artist.allSongs,
            clicked: true
        })
    }

    render() {
        const {artists, songs, clicked} = this.state;

        if (artists.length === 0) {
            return <h1>There are currently no artists in the database!</h1>
        }

        if(songs.length > 0 && clicked) {
            return <ViewSongs songs={songs}/>
        } else if (songs.length === 0 && clicked) {
            return <h1>This artist has no songs yet</h1>
        }

        return (

            <div>
                <h1>All Artists</h1> <br /> <hr />
                {this.state.artists.map(artist => {
                    return (<div key={artist._id}>
                        <h1>{artist.name}</h1>
                        <img src={artist.photo}></img> <br />
                        <a href={artist._id} className="specialBtn" name={artist._id}
                        onClick={this.getArtistSongs.bind(this)}
                        >View Playlist</a>
                        <br /> <br /> 
                        <hr />
                    </div>)
                })}
       
            </div>
        );
    }
}