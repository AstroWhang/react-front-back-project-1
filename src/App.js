import React, { Component } from "react";
import Navbar from "./component/layout/Navbar";
import User from "./component/users/Users";
import Search from "./component/users/Search";
import Alert from "./component/layout/Alert";

import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // displayed a set of users when app first started, now blank before searching
  // async componentDidMount() {
  //   // can't change state directly need to use setState
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id="${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   });
  // }

  // Search Github Users
  // arrow function so put async before parameter rather than function
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id="${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data.items,
      loading: false
    });
  };

  // clear users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  // set Alert
  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type } // shorthand for msg:msg, type:type
    });

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  // closeAlert = () => {
  //   this.setState({
  //     alert: null
  //   });
  // };

  render() {
    const { loading, users } = this.state;

    return (
      <div className='App'>
        <Navbar />

        <div className='container'>
          <Alert alert={this.state.alert} closeAlert={this.state.closeAlert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <User loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
