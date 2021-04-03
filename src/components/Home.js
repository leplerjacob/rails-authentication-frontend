import React, { Component } from "react";
import axios from 'axios'
import Registration from "./auth/Registration";
import Login from './auth/Login'


class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLogoutClick(){
    axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
      this.props.handleLogout()
    }).catch(error => {
      console.log("logout error: ", error)
    })
  }

  handleSuccessfulAuth(data){
    // Update parent component, and redirect user
    // React router gives ability to use props and pass down to child component. One of these props is "history"
    this.props.handleLogin(data)
    // push user to Dashboard
    this.props.history.push("/dashboard")
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

export default Home;
