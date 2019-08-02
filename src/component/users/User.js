import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';


// won't have state, but will be using lifecycle method, componentwillmount

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {

  // replaced componentDidMount, need an empty array because useEffect is constantly running as a loop
  // brackets allow us to specify the event in which it runs or an empty bracket makes it so it runs once
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // sometimes adding dependecies will create the previous error loop
    // regarding error to add dependecies
    // eslint-disable-next-line
  }, []);

  // componentDidMount() {
  //   //match param which uses login from App.js, path='/user/:login' and passes to the function getUser
  //   getUser(match.params.login);
  //   getUserRepos(match.params.login);
  // }

  // static propTypes = {
  //   loading: PropTypes.bool.isRequired,
  //   user: PropTypes.object.isRequired,
  //   repos: PropTypes.array.isRequired,
  //   getUser: PropTypes.func.isRequired,
  //   getUserRepos: PropTypes.func.isRequired,
  // }

  // render() {
    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = user;

    // const { loading, repos } = this.props;

    if (loading) return <Spinner />;
    return (
      <Fragment>
        <Link to="/" className='btn btn-light'>Back to Search</Link>
        Hireable: {' '}
        {hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />} 

        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} className="round-img" alt="" style={{ width: '150px'}}/>
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (<Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>)}
            <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
            <ul>
              <li>
                {login && <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>}
              </li>
              <li>
                {company && <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>}
              </li>
              <li>
                {blog && <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <badge className="badge badge-primary">Followers: {followers}</badge>
          <badge className="badge badge-light">Public Repos: {public_repos}</badge>
          <badge className="badge badge-success">Following: {following}</badge>
          <badge className="badge badge-dark">Public Gist: {public_gists}</badge>
        </div>
        <Repos repos={repos} />

      </Fragment>
    )
  }
// }

User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
};

export default User
