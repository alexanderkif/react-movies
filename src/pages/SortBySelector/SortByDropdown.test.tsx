/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import { moviesStateTest } from '../../utils/constantsTest';
import { Provider } from 'react-redux';
import { store } from '../../App';
import userEvent from '@testing-library/user-event';
import useSortByDropdown from './hook/useSortByDropdown';
import { SortByDropdownView } from './view/SortByDropdownView';

const dispatch = jest.fn();
const { result } = renderHook(() => useSortByDropdown({ dispatch, moviesState: moviesStateTest }));

const setRender = () => render(
  <Provider store={store}>
    <Router>
      <SortByDropdownView {...result.current} />
    </Router>
  </Provider>
);

describe('useSortByDropdown test', () => {
  it('start test', () => {
    expect(result.current.sortBy).toBe(moviesStateTest.sortBy);
    expect(typeof result.current.sortHandler).toBe('function');
  });

  it('open test', () => {
    setRender();
    userEvent.click(screen.getAllByText('release date')[0]);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('toggle test', () => {
    setRender();
    userEvent.click(screen.getAllByText('release date')[1]);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('setSortBy test', () => {
    setRender();
    // screen.debug();
    userEvent.click(screen.getByText('rating'));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
