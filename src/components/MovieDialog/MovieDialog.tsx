import React, { FunctionComponent } from "react";
import useMovieDialog from "./hook/useMovieDialog";
import { MovieDialogView } from "./view/MovieDialogView";

export const MovieDialog: FunctionComponent = () => {

  return <MovieDialogView {...useMovieDialog()} />;
};
