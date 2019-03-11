import React, {Component} from 'react';

export default class ViewSongs extends Component {
    render() {
        return (
            <div>
                here
                {console.log(this.props.songs)}
            </div>
        );
    }
}