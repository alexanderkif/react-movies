/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from '@testing-library/react';
import { act, renderHook } from "@testing-library/react-hooks";
import { movie2, moviesStateTest } from '../../utils/constantsTest';
import { Provider } from 'react-redux';
import { store } from '../../App';
import userEvent from '@testing-library/user-event';
import useMovieDialog from './hook/useMovieDialog';
import { MovieDialogView } from './view/MovieDialogView';
import { IMovieDialogParams } from '../../types';

const dispatch = jest.fn();
const history = jest.fn();
const { result } = renderHook(() => useMovieDialog({ dispatch, moviesState: moviesStateTest }, history));

const setRender = (props: IMovieDialogParams) => render(
  <Provider store={store}>
    <Router>
      <MovieDialogView {...props} />
    </Router>
  </Provider>
);

// editMovie,
// dropdownHandler,
// genres,
// setDialogOpenedHandler,
// deleteMovie,
// closeDropdown,
// formik,
// clickFormHandler,
// deleteMovieSubmit

describe('useMovieDialog test', () => {
  it('start test', () => {
    expect(result.current.genres?.length).toBe(0);
    expect(result.current.editMovie).toBeNull();
    expect(result.current.deleteMovie).toBeFalsy();
    expect(result.current.closeDropdown).toBeFalsy();
    expect(typeof result.current.dropdownHandler).toBe('function');
    expect(typeof result.current.setDialogOpenedHandler).toBe('function');
    expect(typeof result.current.clickFormHandler).toBe('function');
    expect(typeof result.current.deleteMovieSubmit).toBe('function');
  });

  it('open start test', () => {
    setRender(result.current);
    expect(screen.getByText('Add movie')).toBeInTheDocument();
    expect(screen.queryByText('movie id')).not.toBeInTheDocument();
    expect(screen.queryByText('delete movie')).not.toBeInTheDocument();
  });

  it('open edit test', () => {
    result.current.editMovie = movie2;
    setRender(result.current);
    expect(screen.getByText('edit movie')).toBeInTheDocument();
    expect(screen.getByText('movie id')).toBeInTheDocument();
    expect(screen.queryByText('delete movie')).not.toBeInTheDocument();
  });

  it('open delete test', () => {
    result.current.deleteMovie = true;
    setRender(result.current);
    expect(screen.getByText('delete movie')).toBeInTheDocument();
    expect(screen.queryByText('Add movie')).not.toBeInTheDocument();
    expect(screen.queryByText('edit movie')).not.toBeInTheDocument();
  });

  it('submit Add test', async () => {
    result.current.editMovie = movie2;
    result.current.deleteMovie = false;
    if (result.current.editMovie?.id) result.current.editMovie.id = undefined;
    result.current.formik.handleSubmit = jest.fn();
    setRender(result.current);
    userEvent.type(await screen.findByLabelText(/title/i), movie2.title);
    // userEvent.type(await screen.findByLabelText(/release date/i), movie2.release_date);
    // userEvent.type(await screen.findByLabelText(/movie url/i), movie2.poster_path);
    // userEvent.type(await screen.findByTestId('genres'), movie2.genres?.join(', '));
    // userEvent.type(await screen.findByLabelText(/overview/i), movie2.overview);
    // userEvent.type(await screen.findByLabelText(/runtime/i), '' + movie2.runtime);
    expect(result.current.formik.handleSubmit).toHaveBeenCalledTimes(0);
    userEvent.click(await screen.findByRole('button', { name: /submit/i }));
    expect(result.current.formik.handleSubmit).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      screen.debug();
      console.log('errors', result.current.formik.errors);
      // const errors = await screen.findAllByText('Required');
      // expect(errors.length).toBe(5);
      // expect(result.current.formik.handleSubmit).toHaveBeenCalledWith(movie2);
    });
  });
});
