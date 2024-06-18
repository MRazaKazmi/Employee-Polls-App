import React from 'react';
import { connect } from 'react-redux';
import './leaderboard.css';


const Leaderboard = ({ users }) => {
  const userStats = Object.keys(users).map(userId => {
    const user = users[userId];
    const answeredCount = Object.keys(user.answers).length;
    const createdCount = user.questions.length;

    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answeredCount,
      createdCount
    };
  });

  userStats.sort((a, b) => b.answeredCount + b.createdCount - (a.answeredCount + a.createdCount));

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Answered Questions</th>
            <th>Created Questions</th>
          </tr>
        </thead>
        <tbody>
          {userStats.map(user => (
            <tr key={user.id}>
              <td>
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
                <span>{user.name}</span>
              </td>
              <td>{user.answeredCount}</td>
              <td>{user.createdCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(Leaderboard);