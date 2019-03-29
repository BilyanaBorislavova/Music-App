import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import AuthenticationService from '../../../services/authentication'
import './Style.css';

export default class Artist extends Component {
    static service = new AuthenticationService();

    constructor(props){
        super(props)

        this.state = {
            name: '',
            photo: '',
            createdSuccessfully: false,
            message: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {name, photo} = this.state;
        const artist = {name, photo};

        try {
            const createArtist = await Artist.service.createArtist(artist);

            this.setState({
                createdSuccessfully: true,
                message: createArtist.message
            })
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const {createdSuccessfully, message} = this.state;

        if(createdSuccessfully) {
            swal(message)
            return <Redirect to="/"></Redirect>
        }
        return (
            <form className="create-form" onSubmit={this.handleSubmit}>
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