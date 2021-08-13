import { useEffect, MouseEvent, useCallback } from "react";
import { IDetailViewParams, IUseDetailsParams } from "../../../types";
import { ALL_GENRES } from "../../../utils/constants";

const useDetails = (props: IUseDetailsParams): IDetailViewParams => {

  const {
    id,
    dialogOpened,
    movie,
    moviesByGenre,
    activeGenreDetails,
    sortBy,
    sortOrder,
    dispatchGetMovieById,
    dispatchSetActiveGenreDetails,
    dispatchGetMoviesByGenre
  } = props;

  useEffect(() => {
    dispatchGetMovieById(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [id]);

  useEffect(() => {
    if (movie?.genres[0]) dispatchSetActiveGenreDetails(movie.genres[0]);
  }, [movie]);

  useEffect(() => {
    if (movie?.genres[0]) dispatchGetMoviesByGenre(movie.genres[0]);
  }, [movie, sortBy, sortOrder]);

  const setActiveMovieHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText.toLowerCase() === activeGenreDetails?.toLowerCase()) return;
    dispatchSetActiveGenreDetails(target.innerText.toLowerCase());
    dispatchGetMoviesByGenre(
      ALL_GENRES.filter(g => g.toLowerCase() === target.innerText.toLowerCase())[0],
      ''
    );
  }, [activeGenreDetails]);

  return {
    dialogOpened,
    movie,
    moviesByGenre,
    activeGenreDetails,
    setActiveMovieHandler
  };
};

export default useDetails;
