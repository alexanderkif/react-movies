/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { stubMoviesState } from '../../utils/stubsForTests';
import { store } from '../../App';
import useSortByDropdown from './hook/useSortByDropdown';
import { SortByDropdownView } from './view/SortByDropdownView';

const dispatch = jest.fn();
const { result } = renderHook(() => useSortByDropdown({ dispatch, moviesState: stubMoviesState }));

const setRender = (hook) => render(
  <Provider store={store}>
    <Router>
      <SortByDropdownView {...hook} />
    </Router>
  </Provider>,
);

describe('useSortByDropdown test', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

  it('return values test', () => {
    expect(result.current.sortBy).toBe(stubMoviesState.sortBy);
    expect(typeof result.current.sortHandler).toBe('function');
  });

  it('dropdown open test', () => {
    const { container } = setRender(result.current);
    expect(container.querySelectorAll('.genre_closed').length).toBeGreaterThan(
      0,
    );
    userEvent.click(screen.getAllByText('release date')[0]);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(container.querySelectorAll('.genre_closed').length).toBe(0);
  });

  it('toggle asc test', () => {
    setRender(result.current);
    userEvent.click(screen.getAllByText('release date')[1]);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('toggle desc test', () => {
    stubMoviesState.sortOrder = 'desc';
    const { result } = renderHook(() => useSortByDropdown(
      { dispatch, moviesState: stubMoviesState },
    ));
    setRender(result.current);
    userEvent.click(screen.getAllByText('release date')[1]);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('choose invalid sortBy test', () => {
    setRender(result.current);
    const el = screen.getAllByText('release date')[1];
    el.innerHTML = 'invalid';
    userEvent.click(el);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('setSortBy test', () => {
    setRender(result.current);
    // screen.debug();
    userEvent.click(screen.getByText('rating'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
