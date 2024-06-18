import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

const CreatePoll = ({ dispatch, authedUser }) => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser));
    navigate('/home');
  };

  return (
    <div>
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Option</label>
          <textarea
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
          />
        </div>
        <div>
          <label>Second Option</label>
          <textarea
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!optionOneText || !optionTwoText}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.authedUser
});

export default connect(mapStateToProps)(CreatePoll);
