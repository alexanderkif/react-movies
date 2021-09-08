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
export const SET_FILTER = 'SET_FILTER';
export const SET_ACTIVE_GENRE_DETAILS = 'SET_ACTIVE_GENRE_DETAILS';
export const SET_DIALOG_OPEN = 'SET_DIALOG_OPEN';

export const MOVIES_URL = `${window.location.protocol}//${window.location.hostname}:4000/movies`;

export const getMovies = ({
  searchInput = '',
  sortBy = { key: 'vote_average', name: 'rating' },
  sortOrder = 'asc',
  searchBy = 'title',
  filter = '',
  limit = 50,
  offset = 0,
}: IMovieRequestParams) => {
  return (dispatch: Dispatch): void => {
    filter = filter.toLowerCase() === 'all' ? '' : filter;
    axios
      .get(
        `${MOVIES_URL}?sortBy=${sortBy.key}&sortOrder=${sortOrder}&search=${searchInput}&searchBy=${searchBy}&filter=${filter}&limit=${limit}&&offset=${offset}`
      )
      .then(res => {
        dispatch(getMoviesSuccess(res.data.data));
      })
      .catch(err => {
        console.log('axios err', err, err.message);
        dispatch(getMoviesSuccess([]));
      });
  };
};

export const getMoviesSuccess = (movies: IMovieItem[]): IMovieActions => ({
  type: ADD_MOVIES_TO_STORE,
  movies,
});

export const getMoviesByGenre = ({
  searchInput = '',
  sortBy = { key: 'release_date', name: 'release date' },
  sortOrder = 'desc',
  searchBy = 'genres',
  limit = 25,
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
        dispatch(getMoviesByGenreSuccess([]));
      });
  };
};

export const getMoviesByGenreSuccess = (moviesByGenre: IMovieItem[]): IMovieActions => ({
  type: SET_MOVIES_BY_GENRE,
  moviesByGenre,
});

export const getMovieById = (id: number) => {
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

export const getMovieByIdSuccess = (movie: IMovieItem): IMovieActions => ({
  type: GET_MOVIE_BY_ID,
  movie,
});

export const createMovie = (movie: IMovieItem) => {
  return (dispatch: Dispatch): void => {
    if (!movie.tagline) movie.tagline = movie.title;
    axios
      .post(`${MOVIES_URL}`, movie)
      .then(res => {
        dispatch(getMovieByIdSuccess(res.data));
        console.log('createMovie', res.data);
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

export const updateMovie = (movie: IMovieItem) => {
  return (dispatch: Dispatch): void => {
    if (!movie.tagline) movie.tagline = movie.title;
    axios
      .put(`${MOVIES_URL}`, movie)
      .then(res => {
        dispatch(getMovieByIdSuccess(res.data));
        console.log('updateMovie', res.data);
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

export const deleteMovieById = (id: number) => {
  return (): void => {
    axios
      .delete(`${MOVIES_URL}/${id}`)
      .then(res => {
        console.log('deleteMovieById', res.data);
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

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

export const setFilter = (filter: string): IMovieActions => ({
  type: SET_FILTER,
  filter,
});

export const setActiveGenreDetails = (activeGenreDetails: string): IMovieActions => ({
  type: SET_ACTIVE_GENRE_DETAILS,
  activeGenreDetails,
});

export const setDialogOpened = (dialogOpened: boolean, editMovie?: IMovieItem, deleteMovie?: boolean): IMovieActions => ({
  type: SET_DIALOG_OPEN,
  dialogOpened,
  editMovie,
  deleteMovie,
});
