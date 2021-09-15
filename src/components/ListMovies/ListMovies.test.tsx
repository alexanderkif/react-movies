/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ListMovies from '.';
import { store } from '../../App';

const movies = [
  {
    id: 447365,
    title: 'Guardians of the Galaxy Vol. 3',
    tagline: '',
    vote_average: 0,
    vote_count: 9,
    release_date: '2020-05-01',
    poster_path:
      'https://image.tmdb.org/t/p/w500/ldoY4fTZkGISMidNw60GHoNdgP8.jpg',
    overview: "The third film based on Marvel's Guardians of the Galaxy.",
    budget: 0,
    revenue: 0,
    genres: ['Action', 'Adventure', 'Science Fiction'],
    runtime: 5,
  },
  {
    id: 181790,
    title: 'Journey 3: From the Earth to the Moon',
    tagline: '',
    vote_average: 0,
    vote_count: 7,
    release_date: '2018-12-31',
    poster_path:
      'https://image.tmdb.org/t/p/w500/98tbNloMBztAVnWpAznKKVUdi2O.jpg',
    overview: 'Sean and Hank go on their biggest adventure yet, to the moon.',
    budget: 0,
    revenue: 0,
    genres: ['Action', 'Adventure', 'Fantasy', 'Science Fiction'],
    runtime: 5,
  },
];

describe('ListMovies', () => {
  it('snapshot ListMovies', () => {
    const element = render(
      <Provider store={store}>
        <ListMovies movies={movies} />
      </Provider>,
    );
    expect(element).toMatchSnapshot();
  });
});
