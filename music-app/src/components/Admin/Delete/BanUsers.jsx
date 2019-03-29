import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import AuthenticationService from "../../../services/authentication";
import "./Style.css";

export default class BanUsers extends Component {
  static service = new AuthenticationService();

  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      removedSuccessfully: false,
      message: ""
    };
  }

  async componentWillMount() {
    const users = await BanUsers.service.getAllUsers();
    this.setState({
      allUsers: users.users
    });
  }

  async deleteUser(event) {
    event.preventDefault();
    const { name } = event.target;
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this user?",
      icon: "warning",
      dangerMode: true
    });

    if (willDelete) {
      const deleteUser = await BanUsers.service.deleteUser(name);
      if (deleteUser.message) {
        this.setState({
          removedSuccessfully: true,
          message: deleteUser.message
        });
      }
    }
  }

  render() {
    const { allUsers, removedSuccessfully, message } = this.state;

    if (removedSuccessfully) {
      swal(message);
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>All Users</h1>
        <p>List of all users in the database</p> <hr />
        {allUsers.length ? (
          allUsers.map(user => {
            return (
              <div key={user._id}>
                <h2>{user.fullName}</h2>
                <h3>{user.email}</h3>
                <button
                  className="anotherSpecialBtn"
                  name={user._id}
                  onClick={this.deleteUser.bind(this)}
                >
                  Delete User
                </button>
                <br /> <hr />
              </div>
            );
          })
        ) : (
          <h1>No users in the database yet!</h1>
        )}
      </div>
    );
  }
}
