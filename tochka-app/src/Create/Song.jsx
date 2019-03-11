import React, { Component } from 'react';
import './Style.css';

export default class Song extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            lyrics: '',
            artist: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    render() {
        if (sessionStorage.getItem('username') === null || sessionStorage.getItem('isAdmin') === 'false') {
            window.location.href = 'http://localhost:3000';
            return;
        }
        
        let infoToRender = [];
        this.props.artists.map(artist => {
            for (let a of artist) {
                infoToRender.push(a);
            }
        })

        return (
            <form className="create-form" onSubmit={(event) => {
                event.preventDefault();
                this.props.createSong(this.state);
            }}>
                <div className="container">
                    <h1>Add Song</h1> <br />
                    <p>Fill in this form to create a song.</p> <hr />
                    <div class="dropdown">
                        <button class="dropbtn" id="chooseArtist">Select Artist</button>
                        <div class="dropdown-content">
                            {infoToRender.map(artist => {
                                return <a href={artist.name} name="artist" id={artist._id} title={artist.name} onClick={this.handleClick}>{artist.name}</a>
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