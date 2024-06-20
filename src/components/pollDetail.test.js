import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PollDetail from './pollDetail';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('PollDetail', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: '/path/to/avatar.jpg',
          answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
          },
          questions: ['8xf0y6ziyjabvozdd253nd']
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          avatarURL: '/path/to/tyler.jpg',
          answers: {},
          questions: []
        }
      },
      questions: {
        "8xf0y6ziyjabvozdd253nd": {
          id: '8xf0y6ziyjabvozdd253nd',
          author: 'tylermcginnis',
          timestamp: 1467166872634,
          optionOne: {
            votes: ['sarahedo'],
            text: 'Build our new application with Javascript',
          },
          optionTwo: {
            votes: [],
            text: 'Build our new application with Python',
          }
        }
      }
    });
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/8xf0y6ziyjabvozdd253nd']}>
          <Routes>
            <Route path="/questions/:id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('matches the snapshot when question is not found', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/unknown']}>
          <Routes>
            <Route path="/questions/:id" element={<PollDetail />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
