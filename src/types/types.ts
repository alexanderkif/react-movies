import { Action } from "@reduxjs/toolkit";
import { FormikProps } from "formik";
import { ChangeEventHandler, MouseEventHandler, KeyboardEventHandler, SyntheticEvent, Dispatch } from "react";

export interface IMovieItem {
  id?: number;
  title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  poster_path: string;
  overview: string;
  budget: number;
  revenue: number;
  genres: string[];
  runtime: number;
}

export interface IMovieButtonProps {
  text: string;
  active?: boolean;
  small?: boolean;
  clickHandler?: MouseEventHandler<HTMLButtonElement>;
}

export interface IListMoviesProps {
  movies?: IMovieItem[];
}

export interface IMovieActions extends Action, IMovieState { }

export interface IMovieState {
  movies?: IMovieItem[];
  movie?: IMovieItem | null;
  editMovie?: IMovieItem | null;
  searchBy?: SearchByType;
  sortBy?: SortByType;
  searchInput?: string;
  sortOrder?: SortOrderType;
  moviesByGenre?: IMovieItem[];
  activeGenreDetails?: string;
  filter?: string;
  dialogOpened?: boolean;
  deleteMovie?: boolean;
}

export interface IMovieRequestParams {
  searchBy?: SearchByType;
  sortBy?: SortByType;
  searchInput?: string;
  sortOrder?: SortOrderType;
  filter?: string;
  limit?: number;
  offset?: number;
}

export interface IMovieRequestParamsURL {
  searchBy?: string;
  sortBy?: string;
  searchInput?: string;
  sortOrder?: string;
  filter?: string;
}

export interface ISearchProps {
  searchViewProps?: ISearchViewProps
}
export interface ISearchViewProps {
  movies?: IMovieItem[];
  searchBy?: SearchByType;
  sortBy?: SortByType;
  searchInput?: string;
  searchInputHandler?: ChangeEventHandler<HTMLInputElement>;
  searchEnterHandler?: KeyboardEventHandler<HTMLInputElement>;
  sortHandler?: MouseEventHandler<HTMLDivElement>;
  searchByHandler?: MouseEventHandler<HTMLButtonElement>;
  sorts?: SortByType[];
  searches?: SearchByType[];
  dispatchGetMovies?: MouseEventHandler<HTMLButtonElement>;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
  filter?: string;
  dialogOpened?: boolean;
  openFormHandle: MouseEventHandler<HTMLButtonElement>;
}

export interface IUseSearchProps {
  movies?: IMovieItem[];
  searchBy?: SearchByType;
  sortBy?: SortByType;
  searchInput?: string;
  sortOrder?: SortOrderType;
  filter?: string;
  dialogOpened?: boolean;
  dispatchGetMovies: () => void;
  dispatchSetDialogOpened: (opened: boolean, newMovie: IMovieItem) => void;
  dispatchSetSearchInput: (value: string) => void;
  dispatchSetSearchBy: (value: SearchByType) => void;
  dispatchSetFilter: (value: string) => void;
}

export interface IDetailViewParams {
  movie?: IMovieItem | null;
  moviesByGenre?: IMovieItem[];
  activeGenreDetails?: string;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
  sorts?: SortByType[];
  sortHandler?: MouseEventHandler<HTMLDivElement>;
  // sortBy?: SortByType;
  dialogOpened?: boolean;
}

export interface IUseMovie {
  handleMovieClick: (id?: number) => void;
  editMovieHandle: (item: IMovieItem) => void;
  deleteMovieHandle: (item: IMovieItem) => void;
  handleImgOnError: (e: SyntheticEvent<EventTarget & HTMLImageElement>) => void;
}

export interface IUseMovieProps extends IUseMovie {
  movie: IMovieItem;
}

export interface IUseDetailsParams {
  id: number;
  // eslint-disable-next-line
  dispatch: Dispatch<any>;
  moviesState: IMovieState;
}

export interface IGenresPanelParams {
  genres?: string[];
  activeGenre?: string;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
}

export interface IMovieDialogParams {
  editMovie?: IMovieItem | null;
  genres?: string[];
  dropdownHandler?: MouseEventHandler<HTMLDivElement>;
  setDialogOpenedHandler: (isOpen: boolean, movie?: IMovieItem, isDelete?: boolean) => void;
  deleteMovie?: boolean;
  closeDropdown: boolean;
  formik: FormikProps<IMovieFormikProps>;
  clickFormHandler: MouseEventHandler<HTMLDivElement>;
  deleteMovieSubmit: () => void;
}

export interface IMovieFormikProps {
  title: string;
  release_date: string;
  poster_path: string;
  genres?: string[];
  overview: string;
  runtime: number;
}

export interface IUseMovieStateWithDispatchParams {
  moviesState: IMovieState;
  // eslint-disable-next-line
  dispatch: Dispatch<any>;
}

export interface IMovieDialogError {
  title?: string;
  release_date?: string;
  poster_path?: string;
  genres?: string;
  overview?: string;
  runtime?: string;
}

export interface ISortByDropdownParams {
  sortBy?: SortByType;
  sortHandler?: MouseEventHandler<HTMLDivElement>;
}

export interface IUseSortByDropdownParams {
  sortBy?: SortByType;
  sortOrder?: SortOrderType;
  dispatchSetSortBy: (sort: SortByType) => void;
  dispatchSetSortOrder: (sortOrder: SortOrderType) => void;
}

export interface IDropdownParams {
  options?: string[];
  value?: string;
  dropdownHandler?: MouseEventHandler<HTMLDivElement>;
  id?: string;
  name?: string;
  position?: { [key: string]: string };
  closeDropdown?: boolean;
}

export type SearchByType = 'title' | 'genres';
export type SortByType =
  { key: 'vote_average', name: 'rating' }
  | { key: 'release_date', name: 'release date' }
  | { key: 'budget', name: 'budget' }
  | { key: 'revenue', name: 'revenue' };
export type SortOrderType = 'asc' | 'desc';
