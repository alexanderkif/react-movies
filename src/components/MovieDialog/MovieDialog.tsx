import React, { FunctionComponent } from "react";
import useMovieDialog from "./hook/useMovieDialog";
import { MovieDialogView } from "./view/MovieDialogView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { IMovieActions, IMovieItem } from "../../types";
import { createMovie, deleteMovieById, setDialogOpened, updateMovie } from "../../redux/actions";

export const MovieDialog: FunctionComponent = () => {

  const dispatch = useDispatch();

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { movie, editMovie, deleteMovie } = moviesReducer;

  const dispatchSetDialogOpened = (isOpen: boolean, movie?: IMovieItem, isDelete?: boolean) => dispatch(setDialogOpened(isOpen, movie, isDelete));
  const dispatchDeleteMovieById = (id: number) => dispatch(deleteMovieById(id));
  const dispatchUpdateMovie = (movie: IMovieItem) => dispatch(updateMovie(movie));
  const dispatchCreateMovie = (movie: IMovieItem) => dispatch(createMovie(movie));

  return <MovieDialogView {...useMovieDialog({
    movie,
    editMovie,
    deleteMovie,
    dispatchSetDialogOpened,
    dispatchDeleteMovieById,
    dispatchUpdateMovie,
    dispatchCreateMovie
  })} />;
};

export const useMovieDialogOpen = (): ((isOpen: boolean, movie?: IMovieItem, isDelete?: boolean) => IMovieActions) => {
  const dispatch = useDispatch();
  return (isOpen, movie, isDelete) => dispatch(setDialogOpened(isOpen, movie, isDelete));
};
