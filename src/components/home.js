import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
  const { authedUser, questions, users } = props;
  const navigate = useNavigate();


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

    const handleShowPoll = (qid) => {
        navigate(`/questions/${qid}`);
        };

  return (
    <div>
      <h2>Welcome, {users[authedUser].name}</h2>
      <div>
        <h3>Answered Questions</h3>
        <ul>
          {answeredQuestions.map(qid => (
            <li key={qid}>{questions[qid].author}
            <button onClick={() => handleShowPoll(qid)}>Show</button></li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Unanswered Questions</h3>
        <ul>
          {unansweredQuestions.map(qid => (
            <li key={qid}>{questions[qid].author}
            <button onClick={() => handleShowPoll(qid)}>Show</button></li>
          ))}
        </ul>
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
