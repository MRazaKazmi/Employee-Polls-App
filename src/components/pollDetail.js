import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';
import { addAnswerUser } from '../actions/users';
import './pollDetail.css';

const PollDetail = ({ questions, authedUser, users, dispatch }) => {
  const { id } = useParams();

  const handleVote = (option) => {
    dispatch(handleAddAnswer({
      authedUser,
      qid: id,
      answer: option,
    }));
    dispatch(addAnswerUser(authedUser, id, option));
  };

  const question = questions[id];

  if (!question) {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  const { optionOne, optionTwo, author } = question;
  const authorUser = users[author];

  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const optionOnePercentage = totalVotes === 0 ? 0 : ((optionOneVotes / totalVotes) * 100).toFixed(2);
  const optionTwoPercentage = totalVotes === 0 ? 0 : ((optionTwoVotes / totalVotes) * 100).toFixed(2);

  const answers = users[authedUser]?.answers || {};

  return (
    <div className="poll-detail-container">
      <h2>Would you rather...</h2>
      <div className="author-info">
        <img src={authorUser.avatarURL} alt="Author Avatar" className="avatar" />
        <p>Question by: {authorUser.name}</p>
      </div>
      <div className="poll-options">
        <div className="option">
          <button onClick={() => handleVote('optionOne')} disabled={!!answers[id]}>{optionOne.text}</button>
          {answers[id] && (
            <div className="vote-info">
              <p>{optionOneVotes} out of {totalVotes} votes</p>
              <p>({optionOnePercentage}%)</p>
            </div>
          )}
        </div>
        <div className="option">
          <button onClick={() => handleVote('optionTwo')} disabled={!!answers[id]}>{optionTwo.text}</button>
          {answers[id] && (
            <div className="vote-info">
              <p>{optionTwoVotes} out of {totalVotes} votes</p>
              <p>({optionTwoPercentage}%)</p>
            </div>
          )}
        </div>
      </div>
      {answers[id] && <p>Your answer: {answers[id]}</p>}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => ({
  authedUser,
  users,
  questions
});

export default connect(mapStateToProps)(PollDetail);
