/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from '.';

describe('Footer', () => {

  it('snapshot Footer', () => {
    const element = render(
      <Router>
        <Footer />
      </Router>
    );
    expect(element).toMatchSnapshot();
  });
});
