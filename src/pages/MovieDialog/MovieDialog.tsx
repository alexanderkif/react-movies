import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useMovieDialog from './hook/useMovieDialog';
import { MovieDialogView } from './view/MovieDialogView';
import { RootState } from '../../redux/reducers';

export const MovieDialog: FunctionComponent = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const moviesState = useSelector((state: RootState) => state.moviesState);

  return (
    <MovieDialogView {...useMovieDialog({ dispatch, moviesState }, history)} />
  );
};
