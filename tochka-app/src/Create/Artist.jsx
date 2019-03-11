import React, { Component } from 'react';
import './Style.css';

export default class Artist extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: null,
            photo: null,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        })
    }
    render() {
        if(sessionStorage.getItem('isAdmin') === null || sessionStorage.getItem('isAdmin') === 'false') {
            window.location.href = 'http://localhost:3000';
            return;
        }
        return (
            <form className="create-form" onSubmit={(event) => {
                event.preventDefault()
                this.props.createArtist(this.state);
            }}>
                <div className="container">
                    <h1>Add an Artist</h1> <br/> 
                    <p>Fill in this form to create an artist.</p> <hr/>
                    <label htmlFor="name">Name</label> <br />
                    <input type="text" name="name" placeholder="Artist name" onChange={this.handleChange} required></input> <br />
                    <label htmlFor="photo">Photo</label> <br />
                    <input type="text" name="photo" placeholder="Artist photo" onChange={this.handleChange} required></input> <br />
                    <button type="submit" className="btn">Add Artist</button>
                </div>
            </form>
        );
    }
}