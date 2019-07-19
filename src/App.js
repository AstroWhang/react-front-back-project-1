import React, { Component } from 'react';
import Navbar from './component/layout/Navbar';
// import UserItem from './component/users/UserItem';
import User from './component/users/Users';


import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <User />
        </div>

      </div>
    );
  }
}

export default App;
