import { useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { ISearchViewProps, IMovieState, SearchByType, IUseMovieStateWithDispatchParams } from "../../../types";
import {
  getMovies,
  setDialogOpened,
  setFilter,
  setSearchBy,
  setSearchInput
} from "../../../redux/actions";

const searches: SearchByType[] = ["title", "genres"];

const useSearch = ({ dispatch, moviesState }: IUseMovieStateWithDispatchParams): ISearchViewProps => {

  const {
    movies,
    searchBy,
    searchInput,
    sortBy,
    sortOrder,
    filter,
    dialogOpened }: IMovieState = moviesState;

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

  const openFormHandle = (e: MouseEvent) => {
    if (dialogOpened) e.stopPropagation();
    const newMovie = {
      title: '',
      tagline: '',
      vote_average: 0,
      vote_count: 0,
      release_date: '2021-08-01',
      poster_path: '',
      overview: '',
      budget: 0,
      revenue: 0,
      genres: [],
      runtime: 0,
    };
    dispatch(setDialogOpened(true, newMovie));
  };

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
  };

  const searchEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") dispatchGetMovies();
  };

  useEffect(() => {
    dispatchGetMovies();
  }, [sortBy, searchBy, sortOrder, filter]);

  const searchByHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const index = searches
      .map((s) => s.toLowerCase())
      .indexOf(target.innerHTML.toLowerCase())
    if (index === -1) return;
    dispatch(setSearchBy(searches[index]));
  };

  const setActiveMovieHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerHTML.trim().toLowerCase() === filter?.toLowerCase()) return;
    dispatch(setFilter(target.innerHTML.trim().toLowerCase()));
  };

  return {
    movies,
    searchBy,
    sortBy,
    searchInput,
    searchInputHandler,
    searchEnterHandler,
    searchByHandler,
    searches,
    dispatchGetMovies,
    setActiveMovieHandler,
    filter,
    dialogOpened,
    openFormHandle,
  };
};

export default useSearch;
