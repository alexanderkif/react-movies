/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import useSearch from './useSearch';
import { stubMoviesState } from '../../../utils/stubsForTests';
import { Search } from '../Search';
import { store } from '../../../App';

const MockComponent = (props: any) => (
  <Provider store={store}>
    <Router>
      <Search {...props} />
    </Router>
  </Provider>
);
const HookWrapper = ({ hook }: any) => <MockComponent {...hook()} />;

const query = new URLSearchParams(
  'searchInput=god&sortBy=release_date&searchBy=title&sortOrder=desc&filter=comedy',
);
const history = { push: jest.fn() };
const dispatch = jest.fn();

describe('useSearch test', () => {
  it('should return all props', () => {
    const wrapper = mount(
      <HookWrapper
        hook={() => useSearch(query, history, { dispatch, moviesState: stubMoviesState })}
      />,
    );
    const {
      movies,
      searchBy,
      sortBy,
      searchInput,
      searchInputHandler,
      searchEnterHandler,
      searchByHandler,
      setActiveMovieHandler,
      filter,
      dialogOpened,
    } = wrapper.find(MockComponent).props();
    expect(movies?.length).toBeDefined();
    expect(searchBy).toBe(stubMoviesState.searchBy);
    expect(sortBy).toBe(stubMoviesState.sortBy);
    expect(searchInput).toBe(stubMoviesState.searchInput);
    expect(filter).toBe(stubMoviesState.filter);
    expect(dialogOpened).toBeFalsy();
    expect(typeof searchInputHandler).toBe('function');
    expect(typeof searchEnterHandler).toBe('function');
    expect(typeof searchByHandler).toBe('function');
    expect(typeof setActiveMovieHandler).toBe('function');
    expect(dispatch).toHaveBeenCalledTimes(6);
  });
});
