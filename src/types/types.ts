import { Action } from "@reduxjs/toolkit";
import { ChangeEventHandler, MouseEventHandler, KeyboardEventHandler } from "react";

export interface IMovieItem {
  id: number;
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
  movies?: IMovieItem[],
  movie?: IMovieItem | null,
  searchBy?: SearchByType,
  sortBy?: SortByType,
  searchInput?: string,
  sortOrder?: SortOrderType,
  moviesByGenre?: IMovieItem[],
  activeGenre?: string
}

export interface IMovieRequestParams {
  searchBy?: SearchByType,
  sortBy?: SortByType,
  searchInput?: string,
  sortOrder?: SortOrderType,
  limit?: number,
  offset?: number,
}

export interface ISearchProps {
  searchViewProps?: ISearchViewProps
}
export interface ISearchViewProps {
  movies: IMovieItem[] | undefined;
  searchBy?: SearchByType,
  sortBy?: SortByType,
  searchInput?: string,
  searchInputHandler?: ChangeEventHandler<HTMLInputElement>;
  searchEnterHandler?: KeyboardEventHandler<HTMLInputElement>;
  sortHandler?: MouseEventHandler<HTMLDivElement>;
  searchByHandler?: MouseEventHandler<HTMLButtonElement>;
  sorts?: SortByType[];
  searches?: SearchByType[];
  fetchMovies?: MouseEventHandler<HTMLButtonElement>;
}

export interface IDetailViewParams {
  movie?: IMovieItem | null,
  moviesByGenre: IMovieItem[] | undefined;
  activeGenre?: string;
  setActiveMovieHandler?: MouseEventHandler<HTMLDivElement>;
}

export type SearchByType = 'title' | 'genres';
export type SortByType =
  { key: 'vote_average', name: 'rating' }
  | { key: 'release_date', name: 'release date' };
export type SortOrderType = 'asc' | 'desc';
