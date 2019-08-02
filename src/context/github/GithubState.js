import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

// create initial state
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search User

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading

  
  // pass anything that we want available in our entire app
  return <GithubContext.Provider
    value={{
      users: state.user,
      user: state.user,
      repos: state.repos,
      loading: state.loading
    }}
  >
    {props.children}
  </GithubContext.Provider>
};

export default GithubState;