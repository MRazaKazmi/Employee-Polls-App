import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CreatePoll from './createPoll'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('CreatePoll', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: '/path/to/avatar.jpg',
          answers: {},
          questions: []
        }
      },
      questions: {}
    });
  });

  it('should display all elements', () => {
    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CreatePoll />
        </MemoryRouter>
      </Provider>
    );

    // Verify that the form fields are present
    expect(getByLabelText(/first option/i)).toBeInTheDocument();
    expect(getByLabelText(/second option/i)).toBeInTheDocument();

    // Verify that the submit button is present
    expect(getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
