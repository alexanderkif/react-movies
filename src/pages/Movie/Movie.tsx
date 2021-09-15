import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IMovieItem } from '../../types';
import useMovie from './hook/useMovie';
import { MovieView } from './view/MovieView';
import useMovieDialog from '../MovieDialog/hook/useMovieDialog';
import { RootState } from '../../redux/reducers';

export const Movie: FunctionComponent<{ movie: IMovieItem }> = (props: {
  movie: IMovieItem;
}) => {
  const { movie } = props;

  const history = useHistory();

  const dispatch = useDispatch();

  const moviesState = useSelector((state: RootState) => state.moviesState);

  const { setDialogOpenedHandler } = useMovieDialog(
    { dispatch, moviesState },
    history,
  );

  return (
    <MovieView
      {...useMovie(setDialogOpenedHandler, history)}
      movie={movie}
    />
  );
};
