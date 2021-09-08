/**
 * @jest-environment jsdom
 */
import {
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovieByIdSuccess,
  getMovies,
  getMoviesByGenre,
  getMoviesByGenreSuccess,
  getMoviesSuccess,
  setActiveGenreDetails,
  setDialogOpened,
  setFilter,
  setSearchBy,
  setSearchInput,
  setSortBy,
  setSortOrder,
  updateMovie,
  MOVIES_URL
} from "./actions";
import moviesState from "./moviesState";
import { stubMovie1, stubMovie2 } from "../utils/stubsForTests";
import { SortByType, SortOrderType } from "../types";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const dispatch = jest.fn();

describe('acions test', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('ADD_MOVIES_TO_STORE test', () => {
    expect(moviesState({}, getMoviesSuccess([stubMovie1, stubMovie2])).movies).toStrictEqual([stubMovie1, stubMovie2]);
  });

  it('getMovies test', async () => {
    const moviesResponse = [stubMovie1];
    mockedAxios.get.mockResolvedValueOnce({ data: { data: moviesResponse } });
    await act(async () => {
      (getMovies({ searchInput: 'gold' }))(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMoviesSuccess(moviesResponse));
    expect(mockedAxios.get)
      .toHaveBeenCalledWith(`${MOVIES_URL}?sortBy=vote_average&sortOrder=asc&search=gold&searchBy=title&filter=&limit=50&&offset=0`);
  });

  it('getMovies error test', async () => {
    mockedAxios.get.mockRejectedValueOnce({ err: { message: 'something went wrong' } });
    await act(async () => {
      (getMovies({}))(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMoviesSuccess([]));
    expect(mockedAxios.get)
      .toHaveBeenCalledWith(`${MOVIES_URL}?sortBy=vote_average&sortOrder=asc&search=&searchBy=title&filter=&limit=50&&offset=0`);
  });

  it('getMoviesByGenre test', async () => {
    const moviesResponse = [stubMovie1, stubMovie2];
    mockedAxios.get.mockResolvedValueOnce({ data: { data: moviesResponse } });
    await act(async () => {
      (getMoviesByGenre({}))(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMoviesByGenreSuccess(moviesResponse));
  });

  it('getMoviesByGenre error test', async () => {
    mockedAxios.get.mockRejectedValueOnce({ err: { message: 'something went wrong' } });
    await act(async () => {
      (getMoviesByGenre({}))(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMoviesByGenreSuccess([]));
    expect(mockedAxios.get)
      .toHaveBeenCalledWith(`${MOVIES_URL}?sortBy=release_date&sortOrder=desc&search=&searchBy=genres&limit=25&&offset=0`);
  });

  it('getMovieById test', async () => {
    const moviesResponse = stubMovie2;
    mockedAxios.get.mockResolvedValueOnce({ data: moviesResponse });
    await act(async () => {
      (getMovieById(872))(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMovieByIdSuccess(moviesResponse));
    expect(mockedAxios.get)
      .toHaveBeenCalledWith(`${MOVIES_URL}/872`);
  });

  it('getMovieById error test', async () => {
    mockedAxios.get.mockRejectedValueOnce({ err: { message: 'something went wrong' } });
    await act(async () => {
      (getMovieById(872))(dispatch);
    });
    expect(dispatch).toBeCalledTimes(0);
    expect(mockedAxios.get)
      .toHaveBeenCalledWith(`${MOVIES_URL}/872`);
  });

  it('createMovie test', async () => {
    const moviesResponse = stubMovie2;
    const movieToCreate = stubMovie2;
    delete movieToCreate.id;
    movieToCreate.tagline = '';
    mockedAxios.post.mockResolvedValueOnce({ data: moviesResponse });
    await act(async () => {
      createMovie(movieToCreate)(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMovieByIdSuccess(moviesResponse));
    expect(mockedAxios.post)
      .toHaveBeenCalledWith(`${MOVIES_URL}`, movieToCreate);
  });

  it('createMovie error test', async () => {
    const movieToCreate = stubMovie2;
    delete movieToCreate.id;
    mockedAxios.post.mockRejectedValueOnce({ err: { message: 'something went wrong' } });
    await act(async () => {
      createMovie(movieToCreate)(dispatch);
    });
    expect(dispatch).toBeCalledTimes(0);
    expect(mockedAxios.post)
      .toHaveBeenCalledWith(`${MOVIES_URL}`, movieToCreate);
  });

  it('updateMovie test', async () => {
    const movieToUpdate = stubMovie2;
    movieToUpdate.tagline = '';
    const moviesResponse = stubMovie2;
    mockedAxios.put.mockResolvedValueOnce({ data: moviesResponse });
    await act(async () => {
      updateMovie(movieToUpdate)(dispatch);
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(getMovieByIdSuccess(moviesResponse));
    expect(mockedAxios.put)
      .toHaveBeenCalledWith(`${MOVIES_URL}`, movieToUpdate);
  });

  it('updateMovie error test', async () => {
    mockedAxios.put.mockRejectedValueOnce({ err: { message: 'something went wrong' } });
    await act(async () => {
      updateMovie(stubMovie2)(dispatch);
    });
    expect(dispatch).toBeCalledTimes(0);
    expect(mockedAxios.put)
      .toHaveBeenCalledWith(`${MOVIES_URL}`, stubMovie2);
  });

  it('deleteMovieById test', async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: [] });
    await act(async () => {
      (deleteMovieById(872))();
    });
    expect(mockedAxios.delete)
      .toHaveBeenCalledWith(`${MOVIES_URL}/872`);
  });

  it('deleteMovieById error test', async () => {
    mockedAxios.delete.mockRejectedValueOnce({ err: { message: 'something went wrong' } });
    await act(async () => {
      (deleteMovieById(872))();
    });
    expect(mockedAxios.delete)
      .toHaveBeenCalledWith(`${MOVIES_URL}/872`);
  });

  it('GET_MOVIE_BY_ID test', () => {
    expect(moviesState({}, getMovieByIdSuccess(stubMovie2)).movie).toStrictEqual(stubMovie2);
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
    expect(moviesState({}, getMoviesByGenreSuccess([stubMovie1, stubMovie2])).moviesByGenre).toStrictEqual([stubMovie1, stubMovie2]);
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
    expect(moviesState({}, setDialogOpened(dialogOpened)).dialogOpened).toBeFalsy();
  });
});
