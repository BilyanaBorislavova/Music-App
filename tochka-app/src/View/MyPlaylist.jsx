import React, {Component} from 'react';

export default class MyPlaylist extends Component {

    removeFromPlaylist(event) {
        event.preventDefault();
        const {name, title} = event.target;

        fetch(`http://localhost:8000/view/myPlaylist/${title}/${name}`)
            .then(res =>  res.json())
            .then(data => {
                console.log(data)
                window.location.href = 'http://localhost:3000/myPlaylist'
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
            
                <h1>My Playlist</h1>
                {
                this.props.myPlaylist.map(song => {
                    return <div>
                                <h2>{song.name}</h2>
                                <button className="anotherSpecialBtn"
                                name={song._id}
                                title={sessionStorage.getItem('userId')}
                                onClick={this.removeFromPlaylist.bind(this)}
                                >Remove from Playlist</button>
                            </div>
                })
                }
            </div>
        );
    }
}