import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from '../../context/github/githubContext';

// destructure props from here rather than the render below
const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);

  // state = {
  //   text: ''
  // };
  // changed to this using useState hook
  const [text, setText] = useState('')

  // static propTypes = {
  //   searchUsers: PropTypes.func.isRequired,
  //   clearUsers: PropTypes.func.isRequired,
  //   showClear: PropTypes.bool.isRequired,
  //   setAlert: PropTypes.func.isRequired
  // };

  // need const when having functions within a function
  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      // this.setState({ text: "" });
      setText('');
    }
  }; 

  // const onChange = e => {
    // can use name to target multiple submit forms to prevent having to create multiple onchange methods, previously was text: e.target.value
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  // call method that we named above using the useState hook to set value to change state
  const onChange = (e) => {
    setText(e.target.value)
  }

  // render() {
    // const { showClear, clearUsers } = this.props;
    return (
      <div>
        { /* no longer need this.onSubmit because its not a class */ }
        <form onSubmit={onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={text}
            // no longer need this.onChange 
            onChange={onChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
          {githubContext.users.length > 0 && (
            <button className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
              Clear
            </button>
          )}
        </form>
      </div>
    );
  // }
}

// proptypes for functional components are placed outside the function, vs class where we use static
Search.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default Search;
