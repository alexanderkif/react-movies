/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { IMovieItem, IMovieState } from '../../types';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from '../../App';
import Details from '.';
import useDetails from './hook/useDetails';
import { DetailsView } from './view/DetailsView';
import { renderHook } from '@testing-library/react-hooks'

export const movie1: IMovieItem = {
  id: 320288,
  title: "X-Men: Dark Phoenix",
  tagline: "",
  vote_average: 7,
  vote_count: 100,
  release_date: "2019-02-14",
  poster_path: "https://image.tmdb.org/t/p/w500/6qmsupE0opYPIaBGe7T5D2FBzLs.jpg",
  overview: "Gathered together by Professor Charles Xavier to protect a world that fears and hates them, the X-Men had fought many battles, been on adventures that spanned galaxies, grappled enemies of limitless might, but none of this could prepare them for the most shocking struggle they would ever face. One of their own members, Jean Grey, has gained power beyond all comprehension, and that power has corrupted her absolutely! Now, they must decide if the life of the woman they cherish is worth the existence of the entire universe!",
  budget: 200000,
  revenue: 300000,
  genres: ["Action", "Science Fiction"],
  runtime: 90,
}

export const movie2: IMovieItem = {
  id: 320289,
  title: "Second movie",
  tagline: "second",
  vote_average: 8,
  vote_count: 108,
  release_date: "2019-02-18",
  poster_path: "https://image.tmdb.org/t/p/w500/6qmsupE0opYPIaBGe7T5D2FBzLs.jpg",
  overview: "Gathered together by Professor Charles Xavier to protect a world that fears and hates them, the X-Men had fought many battles, been on adventures that spanned galaxies, grappled enemies of limitless might, but none of this could prepare them for the most shocking struggle they would ever face. One of their own members, Jean Grey, has gained power beyond all comprehension, and that power has corrupted her absolutely! Now, they must decide if the life of the woman they cherish is worth the existence of the entire universe!",
  budget: 200000,
  revenue: 300000,
  genres: ["Action", "Comedy"],
  runtime: 80,
}

const moviesState: IMovieState = {
  movies: [movie1, movie2],
  movie: movie1,
  editMovie: null,
  searchBy: 'title',
  sortBy: { key: 'vote_average', name: 'rating' },
  searchInput: '',
  sortOrder: 'asc',
  moviesByGenre: [],
  activeGenreDetails: 'Action',
  filter: '',
  dialogOpened: false,
  deleteMovie: false
}

window.scrollTo = jest.fn();
const dispatch = jest.fn();
const { result } = renderHook(() => useDetails({ id: movie1.id || 0, dispatch, moviesState }));

describe('useDetails test', () => {
  it('useDetails start test', () => {
    // result.current.setActiveMovieHandler = jest.fn()
    expect(result.current.dialogOpened).toBeFalsy();
    expect(result.current.movie).toBe(movie1);
    expect(result.current.moviesByGenre?.length).toBeDefined();
    expect(result.current.activeGenreDetails).toBe('Action');
    // expect(result.current.setActiveMovieHandler).toBeCalledTimes(0);
  });
});

describe('DetailsView test', () => {
  it('DetailsView render test', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <DetailsView {...result.current} />
        </Router>
      </Provider>
    );
    expect(component.find('button.button_active').text().includes(moviesState.activeGenreDetails)).toBeTruthy();
  });
});

describe('Details test', () => {
  it('Details render test', () => {
    const component = mount(
      <Provider store={store}>
        <Router>
          <Details />
        </Router>
      </Provider>
    );
    // console.log(component.debug());
    expect(component.find({ href: '/' })).toHaveLength(4);
  });
});
