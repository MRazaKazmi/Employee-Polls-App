import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';
import './signin.css';

const Signin = ({ users, dispatch }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(selectedUser));
    navigate('/home');
  };

  return (
    <div className="signin-container">
      <h1>Welcome to the Employee Poll App</h1>
      <h2>Please sign in to continue</h2>
      <form onSubmit={handleLogin}>
        <select
          value={selectedUser || ''}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="" disabled>Select User</option>
          {Object.keys(users).map((id) => (
            <option key={id} value={id}>{users[id].name}</option>
          ))}
        </select>
        <button type="submit" disabled={!selectedUser}>Sign In</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Signin);
