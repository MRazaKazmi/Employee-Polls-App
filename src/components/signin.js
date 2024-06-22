import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import './signin.css';

const Signin = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.users);

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser) {
      dispatch(setAuthedUser(selectedUser));
      const { from } = location.state || { from: { pathname: '/home' } };
      navigate(from);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)} data-testid="user-select"
        >
          <option value="" disabled>Select a user</option>
          {Object.keys(users).map((userId) => (
            <option key={userId} value={userId}>
              {users[userId].name}
            </option>
          ))}
        </select>
        <button type="submit" data-testid="sign-in">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
