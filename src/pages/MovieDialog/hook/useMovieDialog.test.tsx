/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from 'enzyme';
import useMovieDialog from "./useMovieDialog";
import { IMovieState } from "../../../types";
import { stubMoviesState } from "../../../utils/stubsForTests";
import { createMock } from "ts-auto-mock";
import { act } from "react-dom/test-utils";
import { MovieDialog } from "../MovieDialog";
import { Provider } from "react-redux";
import { store } from "../../../App";

const MockComponent = (props: any) => (
  <Provider store={store}>
    <Router>
      <MovieDialog {...props} />
    </Router>
  </Provider>
);
const HookWrapper = ({ hook }: any) => <MockComponent {...hook()} />;

const mockCreateMovie = jest.fn();
const mockDeleteMovieById = jest.fn();
const mockUpdateMovie = jest.fn();
const mockSetDialogOpened = jest.fn();
const mockDispatch = jest.fn();
const mockHistory = {
  go: () => jest.fn(),
  push: () => jest.fn()
};

jest.mock('../../../redux/actions', () => ({
  createMovie: (...p: any) => mockCreateMovie(...p),
  deleteMovieById: (...p: any) => mockDeleteMovieById(...p),
  updateMovie: (...p: any) => mockUpdateMovie(...p),
  setDialogOpened: (...p: any) => mockSetDialogOpened(...p)
}));

describe('useMovieDialog test', () => {

  let mockMovieState: IMovieState;

  beforeEach(() => {
    jest.clearAllMocks();
    mockMovieState = createMock<IMovieState>(stubMoviesState);
  });

  it('should return all props', () => {
    const wrapper = mount(
      <HookWrapper hook={() => useMovieDialog(
        { dispatch: mockDispatch, moviesState: mockMovieState },
        mockHistory
      )}
      />
    );
    const {
      editMovie,
      genres,
      deleteMovie,
      closeDropdown,
      formik,
      setDialogOpenedHandler,
      dropdownHandler,
      clickFormHandler,
      deleteMovieSubmit } = wrapper.find(MockComponent).props();
    expect(deleteMovie).toBeFalsy();
    expect(closeDropdown).toBeFalsy();
    expect(editMovie).toStrictEqual(stubMoviesState.editMovie);
    expect(genres).toStrictEqual(stubMoviesState.editMovie?.genres.map(g => g.toLowerCase()));
    expect(typeof formik).toBe('object');
    expect(typeof setDialogOpenedHandler).toBe('function');
    expect(typeof dropdownHandler).toBe('function');
    expect(typeof clickFormHandler).toBe('function');
    expect(typeof deleteMovieSubmit).toBe('function');
    expect(mockDispatch).toBeCalledTimes(0);
  });

  it('useEffect should init genres', async () => {
    const currentHook = () => useMovieDialog(
      { dispatch: mockDispatch, moviesState: mockMovieState },
      mockHistory
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    const { genres } = wrapper.find(MockComponent).props();
    expect(genres).toStrictEqual(stubMoviesState.editMovie?.genres.map(g => g.toLowerCase()));
  });

  it('should delete movie by id ', async () => {
    const currentHook = () => useMovieDialog(
      { dispatch: mockDispatch, moviesState: mockMovieState },
      mockHistory
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    const { deleteMovieSubmit } = wrapper.find(MockComponent).props();
    deleteMovieSubmit();
    expect(mockDeleteMovieById).toBeCalledTimes(1);
    expect(mockDeleteMovieById).toBeCalledWith(stubMoviesState.editMovie?.id);
    expect(mockSetDialogOpened).toBeCalledTimes(1);
    expect(mockSetDialogOpened).toBeCalledWith(false);
  });

  it('should delete movie by id (if this moviePage is open) ', async () => {
    mockMovieState = createMock<IMovieState>({
      ...stubMoviesState,
      editMovie: stubMoviesState.movie
    });
    const currentHook = () => useMovieDialog(
      { dispatch: mockDispatch, moviesState: mockMovieState },
      mockHistory
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    const { deleteMovieSubmit } = wrapper.find(MockComponent).props();
    deleteMovieSubmit();
    expect(mockDeleteMovieById).toBeCalledTimes(1);
    expect(mockDeleteMovieById).toBeCalledWith(stubMoviesState.movie?.id);
    expect(mockSetDialogOpened).toBeCalledTimes(1);
    expect(mockSetDialogOpened).toBeCalledWith(false);
  });

  it('test movie create', async () => {
    const movieWithoutId = Object.assign({}, stubMoviesState.movie);
    delete movieWithoutId.id;
    mockMovieState = createMock<IMovieState>({
      ...stubMoviesState,
      editMovie: movieWithoutId
    });
    const currentHook = () => useMovieDialog(
      { dispatch: mockDispatch, moviesState: mockMovieState },
      mockHistory
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    const { formik } = wrapper.find(MockComponent).props();
    await act(async () => {
      formik.handleSubmit();
    });
    expect(mockCreateMovie).toBeCalledTimes(1);
    expect(mockCreateMovie).toBeCalledWith({
      ...movieWithoutId,
      genres: movieWithoutId.genres.map(g => g.toLowerCase())
    });
    expect(mockSetDialogOpened).toBeCalledTimes(1);
    expect(mockSetDialogOpened).toBeCalledWith(false);
  });

  it('test movie update', async () => {
    const currentHook = () => useMovieDialog(
      { dispatch: mockDispatch, moviesState: mockMovieState },
      mockHistory
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    const { formik } = wrapper.find(MockComponent).props();
    await act(async () => {
      formik.handleSubmit();
    });
    expect(mockUpdateMovie).toBeCalledTimes(1);
    expect(mockUpdateMovie).toBeCalledWith({
      ...stubMoviesState.editMovie,
      genres: stubMoviesState.editMovie?.genres.map(g => g.toLowerCase())
    });
    expect(mockSetDialogOpened).toBeCalledTimes(1);
    expect(mockSetDialogOpened).toBeCalledWith(false);
  });

  it('test movie input change', async () => {
    mockMovieState = createMock<IMovieState>({
      ...stubMoviesState,
      movies: [],
      movie: undefined,
      editMovie: undefined
    });
    const currentHook = () => useMovieDialog(
      { dispatch: mockDispatch, moviesState: mockMovieState },
      mockHistory
    );
    const wrapper = mount(<HookWrapper hook={currentHook} />);
    const { formik } = wrapper.find(MockComponent).props();
    await act(async () => {
      await wrapper.find('#title').simulate('change', { target: { name: 'title', value: 'ti' } });
      await wrapper.find('#overview').simulate('change', { target: { name: 'overview', value: 'over' } });
      await wrapper.find('#runtime').simulate('change', { target: { name: 'runtime', value: -1 } });
      await formik.handleSubmit();
      await formik.validateForm();
      // currentHook = () => useMovieDialog(
      //   { dispatch: mockDispatch, moviesState: mockMovieState },
      //   mockHistory
      // );
      // await wrapper.setProps({ hook: 'bar' });
      // wrapper.update();
    });
    // expect(formik.errors).toBe([1, 2]);
    // console.log('formik', formik, wrapper.find(MockComponent).debug());
  });
});
