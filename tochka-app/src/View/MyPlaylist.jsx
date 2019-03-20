import React, {Component} from 'react';
import { ToastContainer } from "react-toastr";

let container;
export default class MyPlaylist extends Component {

    removeFromPlaylist(event) {
        event.preventDefault();
        const {name, title} = event.target;

        fetch(`http://localhost:8000/view/myPlaylist/${title}/${name}`)
            .then(res =>  res.json())
            .then(data => {
                container.success(<strong className="notice success">Song removed successfully!</strong>)
                setTimeout(function(){
                    window.location.href = 'http://localhost:3000/myPlaylist';
                 }, 1000);
            })
            .catch(err => {
                console.log(err)
            })
    }

    

    render() {
        console.log(this.props.myPlaylist.length)
        return (
            <div>
            <ToastContainer
              ref={ref => container = ref}
              className="toast-top-right"
            />
                <h1>My Playlist</h1>
                <hr/>
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