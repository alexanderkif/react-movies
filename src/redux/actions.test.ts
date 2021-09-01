import { getMovieByIdSuccess, getMoviesByGenreSuccess, getMoviesSuccess, setActiveGenreDetails, setDialogOpened, setFilter, setSearchBy, setSearchInput, setSortBy, setSortOrder } from "./actions";
import moviesState from "./moviesState";
import { moviesStateTest } from "../utils/constantsTest";
import { SortByType, SortOrderType } from "../types";

describe('acions test', () => {

  it('ADD_MOVIES_TO_STORE test', () => {
    if (moviesStateTest.movies)
      expect(moviesState({}, getMoviesSuccess(moviesStateTest.movies)).movies).toBe(moviesStateTest.movies);
  });

  it('GET_MOVIE_BY_ID test', () => {
    if (moviesStateTest.movie)
      expect(moviesState({}, getMovieByIdSuccess(moviesStateTest.movie)).movie).toBe(moviesStateTest.movie);
  });

  it('SET_SEARCH_BY test', () => {
    const searchBy = 'genres';
    expect(moviesState({}, setSearchBy(searchBy)).searchBy).toBe(searchBy);
  });

  it('SET_SEARCH test', () => {
    const searchInput = 'rain';
    expect(moviesState({}, setSearchInput(searchInput)).searchInput).toBe(searchInput);
  });

  it('SET_SORT_BY test', () => {
    const sortBy: SortByType = { key: 'budget', name: 'budget' };
    expect(moviesState({}, setSortBy(sortBy)).sortBy).toBe(sortBy);
  });

  it('SET_SORT_ORDER test', () => {
    const sortOrder: SortOrderType = 'desc';
    expect(moviesState({}, setSortOrder(sortOrder)).sortOrder).toBe(sortOrder);
  });

  it('SET_MOVIES_BY_GENRE test', () => {
    if (moviesStateTest.movies)
      expect(moviesState({}, getMoviesByGenreSuccess(moviesStateTest.movies)).moviesByGenre).toBe(moviesStateTest.movies);
  });

  it('SET_FILTER test', () => {
    const filter = 'comedy';
    expect(moviesState({}, setFilter(filter)).filter).toBe(filter);
  });

  it('SET_ACTIVE_GENRE_DETAILS test', () => {
    const activeGenreDetails = 'comedy';
    expect(moviesState({}, setActiveGenreDetails(activeGenreDetails)).activeGenreDetails).toBe(activeGenreDetails);
  });

  it('SET_DIALOG_OPEN test', () => {
    const dialogOpened = false;
    expect(moviesState({}, setDialogOpened(dialogOpened)).dialogOpened).toBe(dialogOpened);
  });
});
