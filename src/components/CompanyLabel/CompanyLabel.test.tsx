/**
 * @jest-environment jsdom
 */
import React from 'react'; import {
  BrowserRouter as Router,
} from "react-router-dom";
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
    // screen.debug();
    expect(element).toBeInTheDocument();
  });
});
