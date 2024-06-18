import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';


const Signin = (props) => {
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedUser !== '') {
      props.dispatch(setAuthedUser(selectedUser));

      navigate('/home')

    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select User</option>
        {Object.keys(props.users).map((userId) => (
          <option key={userId} value={userId}>
            {props.users[userId].name}
          </option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Signin);
