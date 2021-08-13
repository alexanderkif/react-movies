import { MouseEvent, useEffect } from "react";
import { IMovieDialogParams, IMovieItem, IUseMovieDialogParams } from "../../../types";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const useMovieDialog = (props: IUseMovieDialogParams): IMovieDialogParams => {
  const {
    movie,
    editMovie,
    deleteMovie,
    dispatchSetDialogOpened,
    dispatchDeleteMovieById,
    dispatchUpdateMovie,
    dispatchCreateMovie
  } = props;

  const history = useHistory();

  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    setGenres(editMovie?.genres.map(g => g.toLowerCase()) || []);
  }, []);

  const dropdownHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const genre = target.innerText.toLowerCase() as string;
    if (genres.includes(genre)) {
      setGenres(genres.filter(g => g !== genre));
    } else (
      setGenres(genres.concat([genre]))
    )
  };

  const setDialogOpenedHandler = (isOpen: boolean, movie?: IMovieItem, isDelete?: boolean) => {
    dispatchSetDialogOpened(isOpen, movie, isDelete);
  }

  const deleteMovieHandler = (id: number) => {
    dispatchDeleteMovieById(id);
    dispatchSetDialogOpened(false);
    if (movie?.id === id) setTimeout(() => history.push('/'), 0);
    else setTimeout(() => history.go(0), 0);
  };

  const saveMovieHandler = (movie: IMovieItem) => {
    if (movie.id) {
      dispatchUpdateMovie(movie);
    } else {
      dispatchCreateMovie(movie);
    }
    dispatchSetDialogOpened(false);
    setTimeout(() => history.go(0), 0);
  };

  return { editMovie, dropdownHandler, genres, setDialogOpenedHandler, deleteMovie, deleteMovieHandler, saveMovieHandler };
}

export default useMovieDialog;
