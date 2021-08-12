import { MouseEvent, useEffect } from "react";
import { IMovieDialogParams, IMovieItem } from "../../../types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { createMovie, deleteMovieById, setDialogOpened, updateMovie } from "../../../redux/actions";

const useMovieDialog = (): IMovieDialogParams => {

  const dispatch = useDispatch();

  const [genres, setGenres] = useState<string[]>([]);

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { editMovie, deleteMovie } = moviesReducer;

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

  const setDialogOpenedHandler = () => {
    dispatch(setDialogOpened(false));
  }

  const deleteMovieHandler = (id: number) => {
    dispatch(deleteMovieById(id));
    dispatch(setDialogOpened(false));
    setTimeout(() => history.go(0), 0);
  };

  const saveMovieHandler = (movie: IMovieItem) => {
    if (movie.id) {
      dispatch(updateMovie(movie));
    } else {
      dispatch(createMovie(movie));
    }
    dispatch(setDialogOpened(false));
    setTimeout(() => history.go(0), 0);
  };

  return { editMovie, dropdownHandler, genres, setDialogOpenedHandler, deleteMovie, deleteMovieHandler, saveMovieHandler };
}

export default useMovieDialog;
