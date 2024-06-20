import { _saveQuestion } from './_DATA';
import { _saveQuestionAnswer } from './_DATA';


describe('_saveQuestion', () => {
  it('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
    const questionData = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'author1',
    };

    const savedQuestion = await _saveQuestion(questionData);

    expect(savedQuestion).toBeDefined();
    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion).toHaveProperty('author', questionData.author);
    expect(savedQuestion).toHaveProperty('optionOne');
    expect(savedQuestion.optionOne).toHaveProperty('text', questionData.optionOneText);
    expect(savedQuestion.optionOne).toHaveProperty('votes');
    expect(savedQuestion.optionOne.votes).toEqual([]);
    expect(savedQuestion).toHaveProperty('optionTwo');
    expect(savedQuestion.optionTwo).toHaveProperty('text', questionData.optionTwoText);
    expect(savedQuestion.optionTwo).toHaveProperty('votes');
    expect(savedQuestion.optionTwo.votes).toEqual([]);
  });

  it('should throw an error if incorrect data is passed', async () => {
    const badQuestionData = {
      optionOneText: undefined,
      optionTwoText: 'Option Two',
      author: 'author1',
    };

    await expect(_saveQuestion(badQuestionData)).rejects.toEqual(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });
});


describe('_saveQuestionAnswer', () => {
  it('should return true and update question and user when correctly formatted data is passed', async () => {
    const authedUser = 'sarahedo';
    const qid = '8xf0y6ziyjabvozdd253nd';
    const answer = 'optionTwo';

    const result = await _saveQuestionAnswer({ authedUser, qid, answer });

    expect(result).toBe(true);
  });

  it('should throw an error if incorrect data is passed', async () => {
    await expect(_saveQuestionAnswer({
      authedUser: '',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionTwo'
    })).rejects.toEqual('Please provide authedUser, qid, and answer');
  });
});
