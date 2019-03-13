import React, { Component } from 'react';
import './View.css';
import ViewSongs from './ViewSongs';

export default class ViewArtists extends Component {
    constructor(props) {
        super(props)

        this.state = {
            songs: [],
            showSongs: false
        }
    }

    getArtist(event) {
        event.preventDefault();

        //artist id 
        const { name } = event.target;

        fetch(`http://localhost:8000/view/viewArtist/${name}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    songs: data.allSongs,
                    showSongs: true
                })
            }).catch(err => {
                console.log(err)
            })

    }

    render() {
        let infoToRender = [];
        if (this.props.artists.length === 0) {
            return <h1>There are currently no artists in the database!</h1>
        }

        this.props.artists.map(artist => {
            for (let a of artist) {
                infoToRender.push(a);
            }
        })

        return (

            <div>
                <h1>All Artists</h1> <br /> <hr />
                {infoToRender.map(artist => {
                    return (<div>
                        <h1>{artist.name}</h1>
                        <img src={artist.photo}></img> <br />
                        <a href={artist._id} className="specialBtn" name={artist._id}
                        onClick={this.getArtist.bind(this)}
                        >View Playlist</a>
                        <br /> <br /> <hr />
                    </div>)
                })}
                {console.log(this.state.showSongs)}
                {this.state.showSongs ? <ViewSongs songs={this.state.songs} /> : null}
            </div>
        );
    }
}