import React, { FunctionComponent } from "react";
import { IMovieItem } from "../../types";
import { useMovieDialogOpen } from "../MovieDialog/MovieDialog";
import useMovie from "./hook/useMovie";
import { MovieView } from "./view/MovieView";
import { useHistory } from "react-router-dom";


export const Movie: FunctionComponent<{ movie: IMovieItem }> = (props: { movie: IMovieItem }) => {

  const history = useHistory();

  function handleMovieClick(id?: number) {
    history.push(`/movies/${id}`);
  }

  const openMovieDialog = useMovieDialogOpen();

  return <MovieView {...useMovie(openMovieDialog)} handleMovieClick={handleMovieClick} movie={props.movie} />;
};
