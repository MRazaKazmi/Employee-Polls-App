import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import './createPoll.css';

const CreatePoll = ({ authedUser, dispatch }) => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser));
    navigate('/home');
  };

  return (
    <div className="create-poll-container">
      <h1>Create a New Poll</h1>
      <form onSubmit={handleSubmit} className="create-poll-form">
        <div className="form-group">
          <label htmlFor="optionOne">First Option</label>
          <textarea
            id="optionOne"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            className="textarea"
            placeholder="Enter first option"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="optionTwo">Second Option</label>
          <textarea
            id="optionTwo"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            className="textarea"
            placeholder="Enter second option"
            required
          />
        </div>
        <button type="submit" className="create-poll-button" disabled={!optionOneText || !optionTwoText}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.authedUser,
});

export default connect(mapStateToProps)(CreatePoll);
