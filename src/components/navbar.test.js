import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from './navbar'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('Navbar', () => {
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
      }
    });
  });

  it('should display all expected links and user greeting when logged in', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    // Verify that all expected links are present
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Leaderboard')).toBeInTheDocument();
    expect(getByText('Create Poll')).toBeInTheDocument();
    expect(getByText('Hello, Sarah Edo')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });
});
