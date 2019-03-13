import React, {Component} from 'react';

let container;
export default class ViewSongs extends Component {

    addToPlaylist(event) {
        event.preventDefault();

        const {name, title} = event.target;

        console.log(name, title)
        fetch(`http://localhost:8000/view/viewArtist/${name}/${title}`)
                .then(res => res.json())
                .then(data => {
                    container.success(<strong className="notice success">Song added to playlist!</strong>)
                })
                .catch(err => {
                    console.log(err)
                })
    }

    render() {
        return (
            <div>
                {this.props.songs.map(song => {
                   return (<div>
                       {console.log(song)}
                       <h1>{song.name}</h1>
                       <p>{song.lyrics}</p>
                       <button className="anotherSpecialBtn"
                       name={song.id}
                       title={sessionStorage.getItem('userId')}
                       onClick={this.addToPlaylist.bind(this)}
                       >Add to Playlist</button>
                       </div>)
                })}
            </div>
        );
    }
}