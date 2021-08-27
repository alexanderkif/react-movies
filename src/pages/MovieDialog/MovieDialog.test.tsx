/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from "react-router-dom";
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { renderHook } from "@testing-library/react-hooks";
import { movie2, moviesStateTest } from '../../utils/constantsTest';
import { Provider } from 'react-redux';
import { store } from '../../App';
import userEvent from '@testing-library/user-event';
import useMovieDialog from './hook/useMovieDialog';
import { MovieDialogView } from './view/MovieDialogView';
import { IMovieDialogParams, IMovieState } from '../../types';
import MovieDialog from '.';
import { setDialogOpened } from '../../redux/actions';

const dispatch = jest.fn();
const history = jest.fn();
const setHook = (currentState: IMovieState) => renderHook(() => useMovieDialog({ dispatch, moviesState: currentState }, history));

const setRender = (props: IMovieDialogParams) => render(
  <Provider store={store}>
    <Router>
      <MovieDialogView {...props} />
    </Router>
  </Provider>
);

describe('MovieDialog test', () => {
  const { result } = setHook(moviesStateTest);

  it('MovieDialog render test', () => {
    render(
      <Provider store={store}>
        <Router>
          <MovieDialog />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Add movie')).toBeInTheDocument();
  });

  it('open dropdown click test', async () => {
    dispatch.mockClear();
    const { container } = setRender(result.current);
    expect(result.current.closeDropdown).toBeFalsy();
    expect(dispatch).toHaveBeenCalledTimes(0);
    await act(async () => {
      userEvent.click(container.getElementsByClassName('dropdown')[0]);
      userEvent.click(screen.getByText(/comedy/i));
      userEvent.click(container.getElementsByClassName('dropdown')[0]);
      userEvent.click(screen.getByText(/action/i));
    });
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  result.current.clickFormHandler = jest.fn();

  it('Add dialog click test', async () => {
    dispatch.mockClear();
    const { container } = setRender(result.current);
    expect(dispatch).toHaveBeenCalledTimes(0);
    act(() => {
      userEvent.click(container.getElementsByClassName('closeIcon')[0]);
      userEvent.click(screen.getByText(/reset/i));
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(4);
  });

  it('Delete dialog click test', async () => {
    dispatch.mockClear();
    const { container } = setRender({ ...result.current, deleteMovie: true });
    expect(dispatch).toHaveBeenCalledTimes(0);
    act(() => {
      userEvent.click(container.getElementsByClassName('closeIcon')[0]);
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

describe('useMovieDialog test', () => {
  const { result } = setHook(moviesStateTest);

  it('start test', () => {
    expect(result.current.genres?.length).toBe(0);
    expect(result.current.editMovie).toBe(movie2);
    expect(result.current.deleteMovie).toBeFalsy();
    expect(result.current.closeDropdown).toBeFalsy();
    expect(typeof result.current.dropdownHandler).toBe('function');
    expect(typeof result.current.setDialogOpenedHandler).toBe('function');
    expect(typeof result.current.clickFormHandler).toBe('function');
    expect(typeof result.current.deleteMovieSubmit).toBe('function');
  });

  it('open start test', () => {
    result.current.editMovie = undefined;
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

  result.current.formik.handleSubmit = jest.fn();

  it('submit Add test', async () => {
    result.current.editMovie = movie2;
    result.current.deleteMovie = false;
    if (result.current.editMovie?.id) result.current.editMovie.id = undefined;
    setRender(result.current);
    expect(result.current.formik.handleSubmit).toHaveBeenCalledTimes(0);
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /submit/i }));
    });
    expect(result.current.formik.handleSubmit).toHaveBeenCalledTimes(1);
    // screen.debug();
  });
});

describe('useMovieDialog validate empty test', () => {
  const { result } = setHook({ ...moviesStateTest, editMovie: undefined });

  it('empty formik test', async () => {
    setRender(result.current);
    await waitFor(async () => userEvent.type(await screen.findByLabelText(/title/i), 'ee'));
    await result.current.formik.validateForm();
    await waitFor(() => screen.debug());
  });
});

describe('useMovieDialog validate Must be test', () => {
  const { result, rerender } = setHook({
    ...moviesStateTest, editMovie: {
      ...movie2,
      title: 'Du',
      overview: 'Four',
      runtime: -1
    }
  });

  it('Must be formik test', async () => {
    setRender(result.current);
    await waitFor(async () => userEvent.type(await screen.findByLabelText(/title/i), 'ee'));
    await result.current.formik.validateForm();
    await waitFor(() => rerender());
    await waitFor(() => {
      screen.debug();
    });
  });
});
