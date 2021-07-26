import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { IMovieActions, IMovieItem, IMovieRequestParams, SearchByType, SortByType, SortOrderType } from '../types';

export const GET_MOVIE_BY_ID = 'GET_MOVIE_BY_ID';
export const ADD_MOVIES_TO_STORE = 'ADD_MOVIES_TO_STORE';
export const SET_SEARCH_BY = 'SET_SEARCH_BY';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';
export const SET_MOVIES_BY_GENRE = 'SET_MOVIES_BY_GENRE';
export const SET_ACTIVE_GENRE = 'SET_ACTIVE_GENRE';

const MOVIES_URL = 'https://reactjs-cdp.herokuapp.com/movies';

export const getMovies = ({
  searchInput = '',
  sortBy = { key: 'vote_average', name: 'rating' },
  sortOrder = 'asc',
  searchBy = 'title',
  limit = 50,
  offset = 0,
}: IMovieRequestParams) => {
  return (dispatch: Dispatch): void => {
    axios
      .get(
        `${MOVIES_URL}?sortBy=${sortBy.key}&sortOrder=${sortOrder}&search=${searchInput}&searchBy=${searchBy}&limit=${limit}&&offset=${offset}`
      )
      .then(res => {
        dispatch(getMoviesSuccess(res.data.data));
      })
      .catch(err => {
        console.log('axios err', err, err.message);
        // dispatch(getMoviesError(err));             TO DO
      });
  };
};

const getMoviesSuccess = (movies: IMovieItem[]): IMovieActions => ({
  type: ADD_MOVIES_TO_STORE,
  movies,
});

// const getMoviesError = movies => ({
//   type: ADD_MOVIES_TO_STORE,
//   movies: [],
// });

export const getMoviesByGenre = ({
  searchInput = '',
  sortBy = { key: 'vote_average', name: 'rating' },
  sortOrder = 'desc',
  searchBy = 'genres',
  limit = 15,
  offset = 0,
}: IMovieRequestParams) => {
  return (dispatch: Dispatch): void => {
    axios
      .get(
        `${MOVIES_URL}?sortBy=${sortBy.key}&sortOrder=${sortOrder}&search=${searchInput}&searchBy=${searchBy}&limit=${limit}&&offset=${offset}`
      )
      .then(res => {
        dispatch(getMoviesByGenreSuccess(res.data.data));
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

const getMoviesByGenreSuccess = (moviesByGenre: IMovieItem[]): IMovieActions => ({
  type: SET_MOVIES_BY_GENRE,
  moviesByGenre,
});

export const getMovieById = ({ id }: { id: number }) => {
  return (dispatch: Dispatch): void => {
    axios
      .get(`${MOVIES_URL}/${id}`)
      .then(res => {
        dispatch(getMovieByIdSuccess(res.data));
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

const getMovieByIdSuccess = (movie: IMovieItem): IMovieActions => ({
  type: GET_MOVIE_BY_ID,
  movie,
});

export const setSearchBy = (searchBy: SearchByType): IMovieActions => ({
  type: SET_SEARCH_BY,
  searchBy,
});

export const setSearchInput = (searchInput: string): IMovieActions => ({
  type: SET_SEARCH,
  searchInput,
});

export const setSortBy = (sortBy: SortByType): IMovieActions => ({
  type: SET_SORT_BY,
  sortBy,
});

export const setSortOrder = (sortOrder: SortOrderType): IMovieActions => ({
  type: SET_SORT_ORDER,
  sortOrder,
});

export const setActiveGenre = (activeGenre: string): IMovieActions => ({
  type: SET_ACTIVE_GENRE,
  activeGenre,
});
