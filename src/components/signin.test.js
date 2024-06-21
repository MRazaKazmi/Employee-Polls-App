import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Signin from './signin';

const mockStore = configureStore([]);

describe('SignIn', () => {
  let store;
  let users;

  beforeEach(() => {
    users = {
      sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: '/path/to/avatar.jpg',
      },
      tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        avatarURL: '/path/to/tyler.jpg',
      },
    };

    store = mockStore({
      users,
    });
  });

  it('should update the selected user when an option is selected', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </Provider>
    );

    const userSelect = getByTestId('user-select');

    fireEvent.change(userSelect, { target: { value: 'sarahedo' } });

    expect(userSelect.value).toBe('sarahedo');

    const signInButton = getByText('Sign In');
    expect(signInButton).not.toBeDisabled();

    fireEvent.click(signInButton);

  });
});
