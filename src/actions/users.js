export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
export const ADD_ANSWER_USER = 'ADD_ANSWER_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionToUser(question) {
  return {
    type: ADD_QUESTION_TO_USER,
    question,
  };
}


export function addAnswerUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}
