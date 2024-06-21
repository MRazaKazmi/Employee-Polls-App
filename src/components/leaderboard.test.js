import React from 'react';
import { render, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Leaderboard from './leaderboard'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('Leaderboard', () => {
  let store;

  beforeEach(() => {
    const users = {
      sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: '/path/to/avatar.jpg',
        answers: {
          "8xf0y6ziyjabvozdd253nd": 'optionOne',
          "6ni6ok3ym7mf1p33lnez": 'optionTwo',
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
      },
      tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: '/path/to/tyler.jpg',
        answers: {
          "vthrdm985a262al8qx3do": 'optionOne'
        },
        questions: ['loxhs1bqm25b708cmbf3g']
      },
    };

    store = mockStore({
      users,
    });
  });

  it('should display the correct user name, number of questions asked, and number of questions answered', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Check if the user names are displayed
    const sarahRow = getByText('Sarah Edo').closest('tr');
    const tylerRow = getByText('Tyler McGinnis').closest('tr');

    // Verify Sarah Edo's stats
    if (sarahRow) {
      const { getAllByText: getAllByTextInSarahRow } = within(sarahRow);
      const sarahStats = getAllByTextInSarahRow('2');
      expect(sarahStats).toHaveLength(2); // Sarah Edo should have 2 occurrences of '2' in her row
    }

    // Verify Tyler McGinnis's stats
    if (tylerRow) {
      const { getAllByText: getAllByTextInTylerRow } = within(tylerRow);
      const tylerStats = getAllByTextInTylerRow('1');
      expect(tylerStats).toHaveLength(2); // Tyler McGinnis should have 2 occurrences of '1' in his row
    }
  });
});
