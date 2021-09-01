import React, { FunctionComponent } from "react";
import { IMovieItem } from "../../types";
import useMovie from "./hook/useMovie";
import { MovieView } from "./view/MovieView";
import { useHistory } from "react-router-dom";
import useMovieDialog from "../MovieDialog/hook/useMovieDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";


export const Movie: FunctionComponent<{ movie: IMovieItem }> = (props: { movie: IMovieItem }) => {

  const history = useHistory();

  const dispatch = useDispatch();

  const moviesState = useSelector((state: RootState) => state.moviesState);

  const { setDialogOpenedHandler } = useMovieDialog({ dispatch, moviesState }, history);

  return <MovieView {...useMovie(setDialogOpenedHandler, history)} movie={props.movie} />;
};
