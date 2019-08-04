import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./component/layout/Navbar";
import Users from "./component/users/Users";
import Search from "./component/users/Search";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import Contact from "./component/pages/Contact";
import User from "./component/users/User";

import axios from "axios";
import GithubState from './context/github/GithubState';
import "./App.css";

const App = () => {
  // values used for useState are the default values
  // const [users, setUsers] = useState([]); no longer used in app level state (all in context)
  // const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null);

  // search users
  // moved to githubstate

  // get single github user
  // moved to githubstate
  // const getUser = async (login) => {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `https://api.github.com/users/${login}?&client_id="${
  //     process.env.REACT_APP_GITHUB_CLIENT_ID
  //     }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   setUser(res.data);
  //   setLoading(false);
  // };

  // get user repos
  const getUserRepos = async (login) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id="${
      process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  // clear users from state
  // moved to githubState
 

  // set Alert
   const showAlert = (msg, type) => {
    setAlert({msg, type})
    setTimeout(() => setAlert(null), 3000);
  };

    return (
      <GithubState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props => (
                  <Fragment>
                    <Search
                      // searchUsers={searchUsers}
                      // clearUsers={clearUsers}
                      // showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users />
                  </Fragment>
                )} />
                <Route exact path='/about' component={About} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/user/:login' render={props => (
                  <User 
                    {...props} 
                    // getUser={getUser} 
                    getUserRepos={getUserRepos} 
                    // user={user} 
                    // loading={loading} 
                    repos={repos} />
                  )} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    );
}

export default App;
