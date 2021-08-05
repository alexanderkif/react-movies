import { MouseEvent, useEffect } from "react";
import { IMovieDialogParams } from "../../../types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { setDialogOpened } from "../../../redux/actions";

const useMovieDialog = (): IMovieDialogParams => {

  const dispatch = useDispatch();

  const [genres, setGenres] = useState<string[]>([]);

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { editMovie } = moviesReducer;

  useEffect(() => {
    console.log('useMovieDialog setGenres');
    setGenres(editMovie?.genres.map(g => g.toLowerCase()) || []);
  }, []);

  const selectorHandler = (e: MouseEvent<HTMLDivElement>) => {
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

  return { editMovie, selectorHandler, genres, setDialogOpenedHandler };
}

export default useMovieDialog;
