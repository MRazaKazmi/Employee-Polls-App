import { RECEIVE_USERS, ADD_QUESTION_TO_USER, ADD_ANSWER_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION_TO_USER:
      const { id, author } = action.question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };

    case ADD_ANSWER_USER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser]?.answers,
            [qid]: answer,
          },
        },
      };
    default:
      return state;
  }
}

