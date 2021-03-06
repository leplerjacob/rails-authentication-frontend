import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // desctructure
    const { email, password } = this.state;

    const reqObj = {
      user: {
        email: email,
        password: password,
      },
    };

    axios
      .post("http://localhost:3001/sessions", reqObj, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data.logged_in){
          this.props.handleSuccessfulAuth(response.data)
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
