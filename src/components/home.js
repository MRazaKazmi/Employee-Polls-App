import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css';


const Home = (props) => {
  const { authedUser, questions, users } = props;

  const answeredQuestions = Object.keys(questions)
    .filter(qid =>
      questions[qid].optionOne.votes.includes(authedUser) ||
      questions[qid].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    console.log(answeredQuestions)

  const unansweredQuestions = Object.keys(questions)
    .filter(qid =>
      !questions[qid].optionOne.votes.includes(authedUser) &&
      !questions[qid].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return (
    <div className="home-container">
    <h1>Welcome, {users[authedUser].name}</h1>
    <div className="questions-wrapper">

    <div className="home-box unanswered-box">
        <h2>Answered Questions</h2>
        {answeredQuestions.length === 0 ? (
          <p>No answered questions</p>
        ) : (
          answeredQuestions.map((qid) => (
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

        <div className="home-box answered-box">
          <h2>Unanswered Questions</h2>
          {unansweredQuestions.length === 0 ? (
            <p>No unanswered questions</p>
          ) : (
            unansweredQuestions.map((qid) => (
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

