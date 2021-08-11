/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('render app', () => {
    render(<App />);
    const element = screen.getAllByText(/roulette/i)[0];
    // screen.debug();
    expect(element).toBeInTheDocument();
  });
});
