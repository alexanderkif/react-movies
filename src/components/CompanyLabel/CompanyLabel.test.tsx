/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { CompanyLabel } from './CompanyLabel';

describe('CompanyLabel', () => {
  it('render CompanyLabel', () => {
    render(
      <Router>
        <CompanyLabel />
      </Router>
    );
    const element = screen.getAllByText(/roulette/i)[0];
    expect(element).toBeInTheDocument();
  });

  it('snapshot CompanyLabel', () => {
    const element = render(
      <Router>
        <CompanyLabel />
      </Router>
    );
    expect(element).toMatchSnapshot();
  });
});
