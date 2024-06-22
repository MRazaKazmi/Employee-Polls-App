// Home.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css';

const Home = (props) => {
  const { authedUser, questions, users } = props;

  // State to manage the current view: 'answered' or 'unanswered'
  const [view, setView] = useState('unanswered');

  // Filter answered and unanswered questions
  const answeredQuestions = Object.keys(questions)
    .filter(qid =>
      questions[qid].optionOne.votes.includes(authedUser) ||
      questions[qid].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQuestions = Object.keys(questions)
    .filter(qid =>
      !questions[qid].optionOne.votes.includes(authedUser) &&
      !questions[qid].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  // Determine which questions to show based on the current view
  const questionsToShow = view === 'answered' ? answeredQuestions : unansweredQuestions;

  return (
    <div className="home-container">
      <h1>Welcome, {users[authedUser].name}</h1>
      <div className="toggle-buttons">
        <button
          onClick={() => setView('unanswered')}
          className={view === 'unanswered' ? 'active' : ''}
        >
          Unanswered Questions
        </button>
        <button
          onClick={() => setView('answered')}
          className={view === 'answered' ? 'active' : ''}
        >
          Answered Questions
        </button>
      </div>
      <div className="questions-wrapper">
        <div className="home-box">
          <h2>{view === 'answered' ? 'Answered Questions' : 'Unanswered Questions'}</h2>
          {questionsToShow.length === 0 ? (
            <p>No {view} questions</p>
          ) : (
            questionsToShow.map((qid) => (
              <div key={qid} className="question-box">
                <p>{questions[qid].author} asks:</p>
                <p>Would you rather</p>
                <p>{questions[qid].optionOne.text} or...</p>
                <Link to={`/questions/${qid}`}>
                  <button>Show</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authedUser: state.authedUser,
  questions: state.questions,
  users: state.users,
});

export default connect(mapStateToProps)(Home);
