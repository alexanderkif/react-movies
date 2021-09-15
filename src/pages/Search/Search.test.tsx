/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import useSearch from './hook/useSearch';
import { stubMoviesState } from '../../utils/stubsForTests';
import { store } from '../../App';
import { SearchView } from './view/SearchView';
import { setDialogOpened, setSearchInput } from '../../redux/actions';

const query = new URLSearchParams(
  'searchInput=god&sortBy=release_date&searchBy=title&sortOrder=desc&filter=comedy',
);
const history = { push: jest.fn() };
const dispatch = jest.fn();
const { result } = renderHook(() => useSearch(
  query,
  history,
  { dispatch, moviesState: stubMoviesState },
));

const setUp = () => mount(
  <Provider store={store}>
    <Router>
      <SearchView {...result.current} />
    </Router>
  </Provider>,
);

const setRender = () => render(
  <Provider store={store}>
    <Router>
      <SearchView {...result.current} />
    </Router>
  </Provider>,
);

describe('SearchView test', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

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
    component
      .find('.input')
      .at(0)
      .simulate('change', { target: { value: 'comedy' } });
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
