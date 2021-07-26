import { useEffect, MouseEvent } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById, getMoviesByGenre } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { IDetailViewParams } from "../../../types";
import { setActiveGenre } from "../../../redux/actions";

const useDetails = (id: number): IDetailViewParams => {

  const location = useLocation();
  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { movie, moviesByGenre, activeGenre } = moviesReducer;

  useEffect(() => {
    dispatch(
      getMovieById({ id: id })
    );
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(setActiveGenre(movie?.genres[0] || ''));
    dispatch(
      getMoviesByGenre({
        searchInput: movie?.genres[0]
      })
    );
  }, [movie]);

  const setActiveMovieHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText === activeGenre) return;
    dispatch(setActiveGenre(target.innerText));
    dispatch(
      getMoviesByGenre({
        searchInput: target.innerText
      })
    );
  };

  return { movie, moviesByGenre, activeGenre, setActiveMovieHandler };
};

export default useDetails;
