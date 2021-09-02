/**
 * @jest-environment jsdom
 */
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import { act, renderHook } from "@testing-library/react-hooks";
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

  beforeEach(() => {
    jest.resetAllMocks();
  });

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

  it('open dropdown click test', () => {
    // dispatch.mockClear();
    const { result } = setHook(moviesStateTest);
    const { container, rerender } = setRender(result.current);
    expect(result.current.closeDropdown).toBeFalsy();
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(result.current.genres?.length).toBe(0);
    act(() => {
      userEvent.click(container.getElementsByClassName('dropdown')[0]);
      userEvent.click(screen.getByText(/comedy/i));
    });
    expect(result.current.genres).toStrictEqual(['comedy']);
    rerender(
      <Provider store={store}>
        <Router>
          <MovieDialogView {...result.current} />
        </Router>
      </Provider>
    );
    act(() => {
      userEvent.click(container.getElementsByClassName('dropdown')[0]);
      userEvent.click(screen.getByText(/action/i));
    });
    expect(result.current.genres).toStrictEqual(['comedy', 'action']);
    rerender(
      <Provider store={store}>
        <Router>
          <MovieDialogView {...result.current} />
        </Router>
      </Provider>
    );
    act(() => {
      userEvent.click(container.getElementsByClassName('dropdown')[0]);
      userEvent.click(screen.getAllByText(/comedy/i)[1]);
    });
    expect(result.current.genres).toStrictEqual(['action']);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  it('Add dialog click test', () => {
    // dispatch.mockClear();
    const { result } = setHook(moviesStateTest);
    result.current.clickFormHandler = jest.fn();
    const { container } = setRender(result.current);
    expect(dispatch).toHaveBeenCalledTimes(0);
    act(() => {
      userEvent.click(container.getElementsByClassName('darkWrapper')[0]);
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(1);
    act(() => {
      userEvent.click(container.getElementsByClassName('closeIcon')[0]);
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(3);
    act(() => {
      userEvent.click(screen.getByText(/reset/i));
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(5);
  });

  it('Delete dialog click test', () => {
    // dispatch.mockClear();
    const { result } = setHook(moviesStateTest);
    const { container } = setRender({ ...result.current, deleteMovie: true });
    expect(dispatch).toHaveBeenCalledTimes(0);
    act(() => {
      userEvent.click(container.getElementsByClassName('darkWrapper')[0]);
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(1);
    act(() => {
      userEvent.click(container.getElementsByClassName('closeIcon')[0]);
    });
    expect(dispatch).toHaveBeenCalledWith(setDialogOpened(false));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
