import React, { Component } from "react";
import axios from 'axios'
import Home from "./Home";
import Dashboard from "./Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
    };
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  checkLoginStatus(){
    // withCredentials allows api to read cookie
    axios.get('http://localhost:3001/logged_in', { withCredentials: true }).then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: 'LOGGED_IN',
          user: response.data.user
        })
      } else if(!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: 'NOT_LOGGED_IN',
          user: {}
        })
      }
    }).catch(error => {
      console.log("check login error: ", error)
    })
  }

  componentDidMount(){
    this.checkLoginStatus()
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }


  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
