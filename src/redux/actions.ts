import {
  ADD_MOVIES_TO_STORE,
  GET_MOVIE_BY_ID,
  SET_SEARCH_BY,
  SET_SEARCH,
  SET_SORT_BY,
  SET_SORT_ORDER,
  SET_MOVIES_BY_GENRE,
} from './types';
import axios from 'axios';

const MOVIES_URL = 'https://reactjs-cdp.herokuapp.com/movies';

export const getMovies = ({
  search = '',
  sortBy = 'rating',
  sortOrder = 'asc',
  searchBy = 'title',
  limit = 50,
  offset = 0,
}) => {
  return dispatch => {
    axios
      .get(
        `${MOVIES_URL}?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&searchBy=${searchBy}&limit=${limit}&&offset=${offset}`
      )
      .then(res => {
        dispatch(getMoviesSuccess(res.data.data));
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

const getMoviesSuccess = movies => ({
  type: ADD_MOVIES_TO_STORE,
  movies: movies,
});

export const getMoviesByGenre = ({
  search = '',
  sortBy = 'rating',
  sortOrder = 'desc',
  searchBy = 'genres',
  limit = 50,
  offset = 0,
}) => {
  return dispatch => {
    axios
      .get(
        `${MOVIES_URL}?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}&searchBy=${searchBy}&limit=${limit}&&offset=${offset}`
      )
      .then(res => {
        dispatch(getMoviesByGenreSuccess(res.data.data));
      })
      .catch(err => {
        console.log('axios err', err, err.message);
      });
  };
};

const getMoviesByGenreSuccess = moviesByGenre => ({
  type: SET_MOVIES_BY_GENRE,
  moviesByGenre: moviesByGenre,
});

export const getMovieById = ({ id }) => {
  return dispatch => {
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

const getMovieByIdSuccess = movie => ({
  type: GET_MOVIE_BY_ID,
  movie: movie,
});

export const setSearchBy = searchBy => ({
  type: SET_SEARCH_BY,
  searchBy: searchBy,
});

export const setSearchInput = searchInput => ({
  type: SET_SEARCH,
  searchInput: searchInput,
});

export const setSortBy = sortBy => ({
  type: SET_SORT_BY,
  sortBy: sortBy,
});

export const setSortOrder = sortOrder => ({
  type: SET_SORT_ORDER,
  sortOrder: sortOrder,
});
