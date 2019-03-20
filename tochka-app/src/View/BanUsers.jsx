import React, {Component} from 'react';
import {ToastContainer} from 'react-toastr';

let container;
export default class BanUsers extends Component {

    deleteUser(event) { 
        event.preventDefault();

        const {name} = event.target;
        

        fetch(`http://localhost:8000/view/removeUser/${name}`)
            .then(res => res.json())
            .then(data => {
                setTimeout(function(){
                    window.location.href = 'http://localhost:3000/banUsers';
                 }, 1000);
                container.success(<strong className="notice success">User deleted successfully!</strong>)
            })
            .catch(err => {
                console.log(err);
            })
            
           
        }

    render() {
        if(sessionStorage.getItem('isAdmin') === null || sessionStorage.getItem('isAdmin') === 'false') {
            window.location.href = 'http://localhost:3000';
            return;
        }
        return (
             <div>
            <ToastContainer
              ref={ref => container = ref}
              className="toast-top-right"
            />
                 <h1>All Users</h1>
                 <p>List of all users in the database</p>  <hr/>
                 {this.props.allUsers.map((user) => {
                     {console.log(user)}
                     return <div>
                         <h2>{user.fullName}</h2>
                         <h3>{user.email}</h3>
                         <button className="anotherSpecialBtn"
                         name={user._id}
                         onClick={this.deleteUser.bind(this)}>Delete User</button>
                         <br/> <hr/>
                         </div>
                 })}
             </div>
        );
    }
}