import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import useDetails from "./hook/useDetails";
import { DetailsView } from "./view/DetailsView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { getMovieById, getMoviesByGenre } from "../../redux/actions";
import { setActiveGenreDetails } from "../../redux/actions";

export const Details: FunctionComponent = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { dialogOpened, movie, moviesByGenre, activeGenreDetails, sortBy, sortOrder, filter } = moviesReducer;

  const dispatchGetMovieById = (id: number) => dispatch(getMovieById(id));
  const dispatchSetActiveGenreDetails = (genre) => dispatch(setActiveGenreDetails(genre));
  const dispatchGetMoviesByGenre = (genre) => dispatch(
    getMoviesByGenre({
      searchInput: genre,
      sortOrder,
      sortBy,
      filter
    })
  );

  return <DetailsView {...useDetails({
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
  })} />;
};
