import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import sampleData from './sampledata.json';
import { User } from './types';
jest.mock('node-fetch', () => jest.fn());

describe('UserTable', () => {

  beforeEach(() => {
    // global.fetch = jest.fn().mockImplementation(() => (
    //   Promise.resolve({ json: () => Promise.resolve([])})
    // )
    // jest.mock()
  });

  test('can see all the registered users in the system & each user has a name, email and location', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    (sampleData as User[]).forEach(user => {
      (['name', 'email', 'location'] as (keyof User)[]).forEach(property => {
        const element = screen.getAllByText(new RegExp(user[property].replace('(','\\(').replace(')','\\)'),'i'))[0];
        expect(element).toBeInTheDocument();
      })
    });
  });
});
