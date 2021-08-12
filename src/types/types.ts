import { Action } from "@reduxjs/toolkit";
import { ChangeEventHandler, MouseEventHandler, KeyboardEventHandler } from "react";

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

export interface ISearchProps {
  searchViewProps?: ISearchViewProps
}
export interface ISearchViewProps {
  movies: IMovieItem[] | undefined;
  searchBy?: SearchByType;
  sortBy?: SortByType;
  searchInput?: string;
  searchInputHandler?: ChangeEventHandler<HTMLInputElement>;
  searchEnterHandler?: KeyboardEventHandler<HTMLInputElement>;
  sortHandler?: MouseEventHandler<HTMLDivElement>;
  searchByHandler?: MouseEventHandler<HTMLButtonElement>;
  sorts?: SortByType[];
  searches?: SearchByType[];
  fetchMovies?: MouseEventHandler<HTMLButtonElement>;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
  filter?: string;
  dialogOpened?: boolean;
  openFormHandle: MouseEventHandler<HTMLButtonElement>;
}

export interface IDetailViewParams {
  movie?: IMovieItem | null;
  moviesByGenre: IMovieItem[] | undefined;
  activeGenreDetails?: string;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
  sorts?: SortByType[];
  sortHandler?: MouseEventHandler<HTMLDivElement>;
  // sortBy?: SortByType;
  dialogOpened?: boolean;
}

export interface IGenresPanelParams {
  genres?: string[];
  activeGenre?: string;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
}

export interface IMovieDialogParams {
  editMovie?: IMovieItem | null | undefined;
  genres?: string[];
  dropdownHandler?: MouseEventHandler<HTMLDivElement>;
  setDialogOpenedHandler: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMovie?: boolean;
  deleteMovieHandler(id: number): void;
  saveMovieHandler(movie: IMovieItem): void;
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
