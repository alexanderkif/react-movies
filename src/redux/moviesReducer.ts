import { IMovieState, IMovieActions } from '../types';
import {
  ADD_MOVIES_TO_STORE,
  GET_MOVIE_BY_ID,
  SET_SEARCH_BY,
  SET_SEARCH,
  SET_SORT_BY,
  SET_SORT_ORDER,
  SET_MOVIES_BY_GENRE,
  SET_FILTER,
  SET_ACTIVE_GENRE_DETAILS,
} from './actions';

const initialState: IMovieState = {
  movies: [],
  movie: null,
  searchBy: 'title',
  sortBy: { key: 'release_date', name: 'release date' },
  searchInput: '',
  sortOrder: 'desc',
  moviesByGenre: [],
  activeGenreDetails: '',
  filter: 'all',
};

export default function moviesReducer(state = initialState, action: IMovieActions): IMovieState {
  switch (action.type) {
    case ADD_MOVIES_TO_STORE:
      return {
        ...state,
        movies: action.movies,
      };
    case GET_MOVIE_BY_ID:
      return {
        ...state,
        movie: action.movie,
      };
    case SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.searchBy,
      };
    case SET_SEARCH:
      return {
        ...state,
        searchInput: action.searchInput,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.sortOrder,
      };
    case SET_MOVIES_BY_GENRE:
      return {
        ...state,
        moviesByGenre: action.moviesByGenre,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case SET_ACTIVE_GENRE_DETAILS:
      return {
        ...state,
        activeGenreDetails: action.activeGenreDetails,
      };
    default:
      return state;
  }
}
