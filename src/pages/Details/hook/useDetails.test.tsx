/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { createMock } from 'ts-auto-mock';
import useDetails from './useDetails';
import { IMovieState } from '../../../types';
import { stubMovie2, stubMoviesState } from '../../../utils/stubsForTests';

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
    mockMovieState = createMock<IMovieState>(stubMoviesState);
  });

  it('should return all props', () => {
    const wrapper = mount(
      <HookWrapper
        hook={() => useDetails(
            stubMoviesState.movie?.id || 1,
            mockDispatch,
            mockMovieState,
        )}
      />,
    );
    const {
      dialogOpened,
      movie,
      moviesByGenre,
      activeGenreDetails,
      setActiveMovieHandler,
    } = wrapper.find(MockComponent).props();
    expect(dialogOpened).toBeFalsy();
    expect(movie).toStrictEqual(stubMoviesState.movie);
    expect(moviesByGenre).toStrictEqual(stubMoviesState.moviesByGenre);
    expect(activeGenreDetails).toStrictEqual(
      stubMoviesState.activeGenreDetails,
    );
    expect(typeof setActiveMovieHandler).toBe('function');
  });

  it('should run once on init', () => {
    mount(
      <HookWrapper
        hook={() => useDetails(
          stubMoviesState.movie?.id || 1,
          mockDispatch,
          mockMovieState,
        )}
      />,
    );
    expect(mockGetMovieById).toBeCalledTimes(1);
    expect(mockGetMoviesByGenre).toBeCalledTimes(1);
    expect(mockSetActiveGenreDetails).toBeCalledTimes(1);
  });

  it('test useEffect changed movie', async () => {
    let currentHook = () => useDetails(123, mockDispatch, mockMovieState);
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    expect(mockSetActiveGenreDetails).toBeCalledTimes(1);
    expect(mockSetActiveGenreDetails).toBeCalledWith(
      stubMoviesState.movie?.genres[0],
    );
    expect(mockGetMoviesByGenre).toBeCalledTimes(1);
    expect(mockGetMoviesByGenre).toBeCalledWith({
      searchInput: stubMoviesState.movie?.genres[0],
      filter: '',
      sortBy: {
        key: 'release_date',
        name: 'release date',
      },
      sortOrder: 'asc',
    });
    mockGetMoviesByGenre.mockClear();
    mockSetActiveGenreDetails.mockClear();
    currentHook = () => useDetails(123, mockDispatch, { ...mockMovieState, movie: stubMovie2 });
    wrapper.setProps({ hook: currentHook });
    expect(mockSetActiveGenreDetails).toBeCalledTimes(1);
    expect(mockSetActiveGenreDetails).toBeCalledWith(stubMovie2?.genres[0]);
    expect(mockGetMoviesByGenre).toBeCalledTimes(1);
    expect(mockGetMoviesByGenre).toBeCalledWith({
      searchInput: stubMovie2?.genres[0],
      filter: '',
      sortBy: {
        key: 'release_date',
        name: 'release date',
      },
      sortOrder: 'asc',
    });
  });
});
