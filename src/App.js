import React, { Component } from 'react';
import Navbar from './component/layout/Navbar';
// import UserItem from './component/users/UserItem';
import User from './component/users/Users';
import axios from 'axios';


import './App.css';

class App extends Component {

  // componentDidMount() {
  //   axios.get('https://api.github.com/users').then(res => console.log(res.data))
  // }

  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {

    // can't change state directly need to use setState
    this.setState({ loading: true });

    console.log(this.state.users);

    const res = await axios.get('https://api.github.com/users');


    this.setState({
      users: res.data,
      loading: false
    });

    console.log(res.data);
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <div className="container">

          <User loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );

  }
}

export default App;
