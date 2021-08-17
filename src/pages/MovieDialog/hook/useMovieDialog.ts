import { MouseEvent, useEffect, useState } from "react";
import { IMovieDialogError, IMovieDialogParams, IMovieFormikProps, IMovieItem, IUseMovieStateWithDispatchParams } from "../../../types";
import { useFormik } from "formik";
import { createMovie, deleteMovieById, setDialogOpened, updateMovie } from "../../../redux/actions";

const useMovieDialog = (
  { dispatch, moviesState }: IUseMovieStateWithDispatchParams,
  // eslint-disable-next-line
  history
): IMovieDialogParams => {

  const [closeDropdown, setCloseDropdown] = useState<boolean>(false);

  const [genres, setGenres] = useState<string[]>([]);

  const { movie, editMovie, deleteMovie } = moviesState;

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
    dispatch(setDialogOpened(isOpen, movie, isDelete));
  }

  const deleteMovieHandler = (id: number) => {
    dispatch(deleteMovieById(id));
    dispatch(setDialogOpened(false));
    if (movie?.id === id) setTimeout(() => history.push('/'), 0);
    else setTimeout(() => history.go(0), 0);
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

  const validate = (values: IMovieFormikProps) => {
    const errors: IMovieDialogError = {}

    if (!values.title) {
      errors.title = 'Required';
    } else if (values.title.length < 3) {
      errors.title = 'Must be 3 characters or more'
    }

    if (!values.poster_path) {
      errors.poster_path = 'Required';
    }

    if (!genres?.length) {
      errors.genres = 'Required';
    }

    if (!values.overview) {
      errors.overview = 'Required';
    } else if (values.overview.length < 5) {
      errors.overview = 'Must be 5 characters or more'
    }

    if (!values.runtime) {
      errors.runtime = 'Required';
    } else if (values.runtime < 0) {
      errors.runtime = 'Must be positive'
    }

    return errors;
  }

  const formik = useFormik<IMovieFormikProps>({
    initialValues: {
      title: editMovie?.title || '',
      release_date: editMovie?.release_date || '2021-08-01',
      poster_path: editMovie?.poster_path || '',
      genres: editMovie?.genres,
      overview: editMovie?.overview || '',
      runtime: editMovie?.runtime || 0,
    },
    validate,
    onSubmit: values => {
      const modifiedMovie = { ...editMovie, ...values, genres } as IMovieItem;
      saveMovieHandler(modifiedMovie);
    },
  })

  const clickFormHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setCloseDropdown(!closeDropdown);
  };

  const deleteMovieSubmit = () => {
    if (editMovie?.id) deleteMovieHandler(editMovie?.id);
  };

  return {
    editMovie,
    dropdownHandler,
    genres,
    setDialogOpenedHandler,
    deleteMovie,
    closeDropdown,
    formik,
    clickFormHandler,
    deleteMovieSubmit
  };
}

export default useMovieDialog;
