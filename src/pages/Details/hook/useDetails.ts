import { useEffect, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById, getMoviesByGenre } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { IDetailViewParams } from "../../../types";
import { setActiveGenreDetails } from "../../../redux/actions";

const useDetails = (id: number): IDetailViewParams => {

  const location = useLocation();
  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { movie, moviesByGenre, activeGenreDetails, sortBy, sortOrder, filter } = moviesReducer;

  useEffect(() => {
    dispatch(
      getMovieById({ id: id })
    );
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(setActiveGenreDetails(movie?.genres[0] || ''));
  }, [movie]);

  useEffect(() => {
    dispatch(
      getMoviesByGenre({
        searchInput: movie?.genres[0],
        sortOrder,
        sortBy,
        filter
      })
    );
  }, [movie, sortBy, sortOrder]);

  const setActiveMovieHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText.toLowerCase() === activeGenreDetails?.toLowerCase()) return;
    dispatch(setActiveGenreDetails(target.innerText.toLowerCase()));
    dispatch(
      getMoviesByGenre({
        searchInput: target.innerText.toLocaleLowerCase(),
        filter: ''
      })
    );
  };

  return {
    movie,
    moviesByGenre,
    activeGenreDetails,
    setActiveMovieHandler,
    sortBy
  };
};

export default useDetails;
