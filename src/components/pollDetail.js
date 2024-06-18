import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const PollDetail = (props) => {
  const { id } = useParams();
  const { questions, users } = props;
  const question = questions[id];

  if (!question) {
    return <p>This question doesn't exist</p>;
  }

  const author = users[question.author];

  return (
    <div>
      <h2>Poll by {author.name}</h2>
      <div>
        <h4>Options</h4>
        <ul>
          <li>{question.optionOne.text}</li>
          <li>{question.optionTwo.text}</li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions,
  users: state.users,
});

export default connect(mapStateToProps)(PollDetail);
