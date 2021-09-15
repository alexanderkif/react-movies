/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CompanyLabel } from './CompanyLabel';

describe('CompanyLabel', () => {
  it('render CompanyLabel', async () => {
    render(
      <Router>
        <CompanyLabel />
      </Router>,
    );
    const element = screen.getAllByText(/roulette/i)[0];
    expect(element).toBeInTheDocument();
    expect(history.length).toBe(1);
    fireEvent.click(element);
    expect(history.length).toBe(2);
  });

  it('snapshot CompanyLabel', () => {
    const element = render(
      <Router>
        <CompanyLabel />
      </Router>,
    );
    expect(element).toMatchSnapshot();
  });
});
