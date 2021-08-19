/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './App';
// import axios from 'axios';

// jest.mock('axios');

describe('App', () => {
  it('render app', () => {
    render(<App />);
    const element = screen.getAllByText(/roulette/i)[0];
    // screen.debug();
    expect(element).toBeInTheDocument();
  });

  // it('axios getMovies', () => {
  //   axios.get.mockImplementationOnce(() => Promise.resolve({ data: { movies } }))
  // });
});
