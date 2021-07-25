import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById, getMoviesByGenre } from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
import { IDetailViewParams } from "../../../types";

const useDetails = (id: number): IDetailViewParams => {

  const location = useLocation();
  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { movie } = moviesReducer;
  const { moviesByGenre } = moviesReducer;

  useEffect(() => {
    dispatch(
      getMovieById({ id: id })
    );
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(
      getMoviesByGenre({
        searchInput: movie?.genres[0]
      })
    );
  }, [movie]);

  return { movie, moviesByGenre };
};

export default useDetails;
