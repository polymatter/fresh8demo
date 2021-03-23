import React from 'react';
import { render, screen, waitForElementToBeRemoved, getByTestId, waitFor, fireEvent, EventType } from '@testing-library/react';
import App from './App';
import sampleData from './sampledata.json';
import { User } from './types';
jest.mock('node-fetch', () => jest.fn());

describe('UserTable', () => {

  test('can see all the registered users in the system & each user has a name, email and location', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    (sampleData as User[]).forEach(user => {
      (['name', 'email', 'location'] as (keyof User)[]).forEach(property => {
        const element = screen.getAllByText(new RegExp(user[property].replace('(','\\(').replace(')','\\)'),'i'))[0]; //should be at least one but may be many
        expect(element).toBeInTheDocument();
      })
    });
  });

  test('can filter by name', async () => {
    render(<App/>);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const filterTextBox = screen.getByTestId('filter')! as HTMLInputElement;
    fireEvent.change(filterTextBox, { target: { value: 'lucas' }})
    const nameShouldNotAppear = 'Misty Considine';
    expect(screen.queryByText(nameShouldNotAppear)).toBeNull();
    const nameShouldAppear = 'Lucas Kulas';
    expect(screen.queryByText(nameShouldAppear)).not.toBeNull();
  })
});
