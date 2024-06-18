import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';
import './navbar.css';


const Navbar = ({ authedUser, dispatch, users }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setAuthedUser(null));
    navigate('/signin');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/add">Create Poll</Link></li>
        {authedUser && (
          <>
            <li>
              <span>Hello, {users[authedUser].name}</span>
            </li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.authedUser,
  users: state.users
});

export default connect(mapStateToProps)(Navbar);
