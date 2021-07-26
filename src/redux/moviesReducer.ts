import { IMovieState, IMovieActions } from '../types';
import {
  ADD_MOVIES_TO_STORE,
  GET_MOVIE_BY_ID,
  SET_SEARCH_BY,
  SET_SEARCH,
  SET_SORT_BY,
  SET_SORT_ORDER,
  SET_MOVIES_BY_GENRE,
  SET_ACTIVE_GENRE,
} from './actions';

const initialState: IMovieState = {
  movies: [],
  movie: null,
  searchBy: 'title',
  sortBy: { key: 'vote_average', name: 'rating' },
  searchInput: 'adventure',
  sortOrder: 'asc',
  moviesByGenre: [],
  activeGenre: '',
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
    case SET_ACTIVE_GENRE:
      return {
        ...state,
        activeGenre: action.activeGenre,
      };
    default:
      return state;
  }
}
