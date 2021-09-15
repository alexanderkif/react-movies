import {
  useEffect, MouseEvent, useCallback, Dispatch,
} from 'react';
import { IDetailViewParams, IMovieState } from '../../../types';
import { ALL_GENRES } from '../../../utils/constants';
import {
  getMovieById,
  getMoviesByGenre,
  setActiveGenreDetails,
} from '../../../redux/actions';

const useDetails = (
  id: number,
  // eslint-disable-next-line
  dispatch: Dispatch<any>,
  moviesState: IMovieState,
): IDetailViewParams => {
  const {
    dialogOpened,
    movie,
    moviesByGenre,
    activeGenreDetails,
    sortBy,
    sortOrder,
    filter,
  } = moviesState;

  useEffect(() => {
    dispatch(getMovieById(id));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  useEffect(() => {
    if (movie?.genres[0]) dispatch(setActiveGenreDetails(movie.genres[0]));
  }, [movie]);

  useEffect(() => {
    if (movie?.genres[0]) {
      dispatch(
        getMoviesByGenre({
          searchInput: movie.genres[0],
          sortOrder,
          sortBy,
          filter,
        }),
      );
    }
  }, [movie, sortBy, sortOrder]);

  const setActiveMovieHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      if (target.innerText.toLowerCase() === activeGenreDetails?.toLowerCase()) return;
      dispatch(setActiveGenreDetails(target.innerText.toLowerCase()));
      dispatch(
        getMoviesByGenre({
          searchInput: ALL_GENRES.filter(
            (g) => g.toLowerCase() === target.innerText.toLowerCase(),
          )[0],
          sortOrder,
          sortBy,
          filter,
        }),
      );
    },
    [activeGenreDetails],
  );

  return {
    dialogOpened,
    movie,
    moviesByGenre,
    activeGenreDetails,
    setActiveMovieHandler,
  };
};

export default useDetails;
