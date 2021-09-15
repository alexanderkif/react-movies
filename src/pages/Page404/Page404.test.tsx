/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Page404 from '.';

describe('Page404', () => {
  it('snapshot Page404', () => {
    const element = render(
      <Router>
        <Page404 />
      </Router>,
    );
    expect(element).toMatchSnapshot();
  });
});
