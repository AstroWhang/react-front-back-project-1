import React, { Component } from 'react';
import Navbar from './component/layout/Navbar';
// import UserItem from './component/users/UserItem';
import User from './component/users/Users';
import Search from './component/users/Search';

import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false,
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
  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id="${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({
      users: res.data.items,
      loading: false
    });
    console.log(res.data.items);
  }

  // clear users from state

  clearUsers = () => {
    this.setState({
      users: [], loading: false
    });
  }

  render() {

    const {loading, users} = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">


          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false}/>
          <User loading={loading} users={users} />
        </div>
      </div>
    );

  }
}

export default App;
