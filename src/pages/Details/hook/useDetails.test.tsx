/**
 * @jest-environment jsdom
 */
import React from "react";
import { mount } from 'enzyme';
import useDetails from "./useDetails";
import { IMovieState } from "../../../types";
import { movie2, moviesStateTest } from "../../../utils/constantsTest";
import { createMock } from "ts-auto-mock";

const MockComponent = () => null;
const HookWrapper = ({ hook }: any) => <MockComponent {...hook()} />;

const mockGetMovieById = jest.fn();
const mockGetMoviesByGenre = jest.fn();
const mockSetActiveGenreDetails = jest.fn();
const mockDispatch = jest.fn();
window.scrollTo = jest.fn();

jest.mock('../../../redux/actions', () => ({
  getMovieById: (...p: any) => mockGetMovieById(...p),
  getMoviesByGenre: (...p: any) => mockGetMoviesByGenre(...p),
  setActiveGenreDetails: (...p: any) => mockSetActiveGenreDetails(...p),
}));

describe('useDetails test', () => {

  let mockMovieState: IMovieState;

  beforeEach(() => {
    jest.clearAllMocks();
    mockMovieState = createMock<IMovieState>(moviesStateTest);
  });

  it('should return all props', () => {
    const wrapper = mount(
      <HookWrapper hook={() => useDetails(
        moviesStateTest.movie?.id || 1,
        mockDispatch,
        mockMovieState
      )}
      />
    );
    const {
      dialogOpened,
      movie,
      moviesByGenre,
      activeGenreDetails,
      setActiveMovieHandler } = wrapper.find(MockComponent).props();
    expect(dialogOpened).toBeFalsy();
    expect(movie).toStrictEqual(moviesStateTest.movie);
    expect(moviesByGenre).toStrictEqual(moviesStateTest.moviesByGenre);
    expect(activeGenreDetails).toStrictEqual(moviesStateTest.activeGenreDetails);
    expect(typeof setActiveMovieHandler).toBe('function');
    expect(mockGetMovieById).toBeCalledTimes(1);
    expect(mockGetMoviesByGenre).toBeCalledTimes(1);
    expect(mockSetActiveGenreDetails).toBeCalledTimes(1);
  });

  it('test useEffect changed movie', async () => {
    let currentHook = () => useDetails(
      123,
      mockDispatch,
      mockMovieState
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    expect(mockSetActiveGenreDetails).toBeCalledTimes(1);
    expect(mockSetActiveGenreDetails).toBeCalledWith(moviesStateTest.movie?.genres[0]);
    expect(mockGetMoviesByGenre).toBeCalledTimes(1);
    expect(mockGetMoviesByGenre).toBeCalledWith({
      searchInput: moviesStateTest.movie?.genres[0],
      filter: "",
      sortBy: {
        key: "release_date",
        name: "release date"
      },
      sortOrder: "asc"
    });
    mockGetMoviesByGenre.mockClear();
    mockSetActiveGenreDetails.mockClear();
    currentHook = () => useDetails(
      123,
      mockDispatch,
      { ...mockMovieState, movie: movie2 }
    );
    wrapper.setProps({ hook: currentHook });
    expect(mockSetActiveGenreDetails).toBeCalledTimes(1);
    expect(mockSetActiveGenreDetails).toBeCalledWith(movie2?.genres[0]);
    expect(mockGetMoviesByGenre).toBeCalledTimes(1);
    expect(mockGetMoviesByGenre).toBeCalledWith({
      searchInput: movie2?.genres[0],
      filter: "",
      sortBy: {
        key: "release_date",
        name: "release date"
      },
      sortOrder: "asc"
    });
  });
});
