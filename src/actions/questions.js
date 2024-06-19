import { _saveQuestion  } from '../utils/_DATA.js';
import { _saveQuestionAnswer } from '../utils/_DATA.js';

import { addQuestionToUser, addAnswerUser } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';


export function receiveQuestions(questions) {
    return {
      type: RECEIVE_QUESTIONS,
      questions,
    };
  }

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      })
      ;
  };
}

function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    return _saveQuestionAnswer(authedUser, qid, answer)
      .then(() => {
        dispatch(addAnswer(authedUser, qid, answer));
        dispatch(addAnswerUser(authedUser, qid, answer));
      })
  };
}