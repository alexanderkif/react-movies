/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import useSearch from "./hook/useSearch";
import { stubMoviesState } from '../../utils/stubsForTests';
import { Provider } from 'react-redux';
import { store } from '../../App';
import { SearchView } from './view/SearchView';
import { setDialogOpened, setSearchInput } from '../../redux/actions';
import userEvent from '@testing-library/user-event';

const dispatch = jest.fn();
const { result } = renderHook(() => useSearch({ dispatch, moviesState: stubMoviesState }));

describe('useSearch test', () => {
  it('useSearch start test', () => {
    expect(result.current.movies?.length).toBeDefined();
    expect(result.current.searchBy).toBe(stubMoviesState.searchBy);
    expect(result.current.sortBy).toBe(stubMoviesState.sortBy);
    expect(result.current.searchInput).toBe(stubMoviesState.searchInput);
    expect(result.current.filter).toBe(stubMoviesState.filter);
    expect(result.current.dialogOpened).toBeFalsy();
    expect(typeof result.current.searchInputHandler).toBe('function');
    expect(typeof result.current.searchEnterHandler).toBe('function');
    expect(typeof result.current.searchByHandler).toBe('function');
    expect(typeof result.current.setActiveMovieHandler).toBe('function');
  });
});

const setUp = () => mount(
  <Provider store={store}>
    <Router>
      <SearchView {...result.current} />
    </Router>
  </Provider>
);

const setRender = () => render(
  <Provider store={store}>
    <Router>
      <SearchView {...result.current} />
    </Router>
  </Provider>
);

describe('SearchView test', () => {

  beforeEach(() => {
    dispatch.mockClear();
  })

  it('openDialogBtn click', () => {
    const component = setUp();
    component.find('.openDialogBtn').simulate('click');
    const newMovie = {
      title: '',
      tagline: '',
      vote_average: 0,
      vote_count: 0,
      release_date: '2021-08-01',
      poster_path: '',
      overview: '',
      budget: 0,
      revenue: 0,
      genres: [],
      runtime: 0,
    };
    expect(dispatch).toBeCalledWith(setDialogOpened(true, newMovie));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('searchInput change', () => {
    const component = setUp();
    component.find('.input').at(0).simulate('change', { target: { value: 'comedy' } });
    expect(dispatch).toBeCalledWith(setSearchInput('comedy'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('searchInput Enter', () => {
    const component = setUp();
    component.find('.input').at(0).simulate('keypress', { key: 'Enter' });
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('searchByHandler click', async () => {
    setRender();
    userEvent.click(screen.getByText('genres'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('setActiveMovieHandler click', async () => {
    setRender();
    // screen.debug();
    userEvent.click(screen.getByText('comedy'));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
