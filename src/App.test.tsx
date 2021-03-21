import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import sampleData from './sampledata.json';
import { User } from './types';

describe('UserTable', () => {

  test('can see all the registered users in the system & each user has a name, email and location', () => {
    render(<App />);
    (sampleData as User[]).forEach(user => {
      (['name', 'email', 'location'] as (keyof User)[]).forEach(property => {
        const element = screen.getAllByText(new RegExp(user[property].replace('(','\\(').replace(')','\\)'),'i'))[0];
        expect(element).toBeInTheDocument();
      })
    });
  });
});
