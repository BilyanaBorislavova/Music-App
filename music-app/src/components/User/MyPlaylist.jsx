import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import AuthenticationService from '../../services/authentication';

export default class MyPlaylist extends Component {
    static service = new AuthenticationService();

    constructor(props) {
        super(props)
        this.state = {
            myPlaylist: [],
            clicked: false
        }
    }

    async componentWillMount() {
        const {userId} = window.sessionStorage;

        const songs = await MyPlaylist.service.myPlaylist(userId);

        this.setState({
            myPlaylist: songs.songs
        })
    }

    async removeFromPlaylist(event) {
        event.preventDefault();
        const {name, title} = event.target;

        try{
            const deletedSong = await MyPlaylist.service.deleteSong(title, name);
            swal(deletedSong.message);
            this.setState({
                clicked: true
            })
        } catch(err) {
            console.log(err);
        }
    }


    render() {
        const {myPlaylist, clicked} = this.state;

        if(clicked) {
            return <Redirect to="/"/>
        }

        if(myPlaylist.length === 0){
            return <h1>There are no songs added to your playlist yet!</h1>
        }

        return (
            <div>
                <h1>My Playlist</h1>
                <hr/>
                {
                myPlaylist.map(song => {
                    return <div key={song.id}>
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