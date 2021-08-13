import React, { FunctionComponent } from "react";
import { SearchView } from "./view/SearchView";
import useSearch from "./hook/useSearch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducers";
import { IMovieItem, IMovieState, SearchByType } from "../../types";
import {
  getMovies,
  setDialogOpened,
  setFilter,
  setSearchBy,
  setSearchInput
} from "../../redux/actions";

export const Search: FunctionComponent = () => {

  const dispatch = useDispatch();
  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const {
    movies,
    searchBy,
    searchInput,
    sortBy,
    sortOrder,
    filter,
    dialogOpened }: IMovieState = moviesReducer;

  const dispatchGetMovies = () => {
    dispatch(
      getMovies({
        searchInput: searchInput,
        sortBy: sortBy,
        searchBy: searchBy,
        sortOrder: sortOrder,
        filter: filter
      })
    );
  };

  const dispatchSetDialogOpened = (opened: boolean, newMovie: IMovieItem) => dispatch(setDialogOpened(opened, newMovie));
  const dispatchSetSearchInput = (value: string) => dispatch(setSearchInput(value));
  const dispatchSetSearchBy = (search: SearchByType) => dispatch(setSearchBy(search));
  const dispatchSetFilter = (filter: string) => dispatch(setFilter(filter));

  return <SearchView {...useSearch({
    movies,
    searchBy,
    searchInput,
    sortBy,
    sortOrder,
    filter,
    dialogOpened,
    dispatchGetMovies,
    dispatchSetDialogOpened,
    dispatchSetSearchInput,
    dispatchSetSearchBy,
    dispatchSetFilter
  })} />;
};
