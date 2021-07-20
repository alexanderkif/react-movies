import {
  ADD_MOVIES_TO_STORE,
  GET_MOVIE_BY_ID,
  SET_SEARCH_BY,
  SET_SEARCH,
  SET_SORT_BY,
} from './types';

const initialState = {
  movies: [],
  movie: null,
  searchBy: 'title',
  sortBy: 'rating',
  searchInput: 'adventure',
};

export default function moviesReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
