import { useEffect, MouseEvent, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById, getMoviesByGenre } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { IDetailViewParams } from "../../../types";
import { setActiveGenreDetails } from "../../../redux/actions";
import { ALL_GENRES } from "../../Search/view/SearchView";

const useDetails = (id: number): IDetailViewParams => {

  const location = useLocation();
  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { dialogOpened, movie, moviesByGenre, activeGenreDetails, sortBy, sortOrder, filter } = moviesReducer;

  useEffect(() => {
    console.log('useDetails getMovieById');
    dispatch(getMovieById(id));
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    console.log('useDetails setActiveGenreDetails');
    dispatch(setActiveGenreDetails(movie?.genres[0] || ''));
  }, [movie]);

  useEffect(() => {
    console.log('useDetails getMoviesByGenre');
    dispatch(
      getMoviesByGenre({
        searchInput: movie?.genres[0],
        sortOrder,
        sortBy,
        filter
      })
    );
  }, [movie, sortBy, sortOrder]);

  const setActiveMovieHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText.toLowerCase() === activeGenreDetails?.toLowerCase()) return;
    dispatch(setActiveGenreDetails(target.innerText.toLowerCase()));
    dispatch(
      getMoviesByGenre({
        searchInput: ALL_GENRES.filter(g => g.toLowerCase() === target.innerText.toLowerCase())[0],
        filter: ''
      })
    );
  }, []);

  return {
    dialogOpened,
    movie,
    moviesByGenre,
    activeGenreDetails,
    setActiveMovieHandler,
    sortBy
  };
};

export default useDetails;
