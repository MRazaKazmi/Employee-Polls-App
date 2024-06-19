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
    return <p>Question not found.</p>;
  }

  const { optionOne, optionTwo, author } = question;
  const authorUser = users[author];

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
          <button onClick={() => handleVote('optionOne')}>{optionOne.text}</button>
        </div>
        <div className="option">
          <button onClick={() => handleVote('optionTwo')}>{optionTwo.text}</button>
        </div>
      </div>
      <p>Your answer: {answers[id]}</p>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => ({
  authedUser,
  users,
  questions
});

export default connect(mapStateToProps)(PollDetail);
