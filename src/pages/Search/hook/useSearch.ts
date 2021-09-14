import { useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { ISearchViewProps, IMovieState, SearchByType, IUseMovieStateWithDispatchParams, SortOrderType } from "../../../types";
import {
  getMovies,
  getMoviesSuccess,
  setDialogOpened,
  setFilter,
  setSearchBy,
  setSearchInput,
  setSortBy,
  setSortOrder
} from "../../../redux/actions";
import { SORTS_BY } from "../../../utils/constants";

const searches: SearchByType[] = ["title", "genres"];

const useSearch = (
  query: URLSearchParams,
  // eslint-disable-next-line
  history: any,
  { dispatch, moviesState }: IUseMovieStateWithDispatchParams
): ISearchViewProps => {

  const {
    movies,
    searchBy,
    searchInput,
    sortBy,
    sortOrder,
    filter,
    dialogOpened }: IMovieState = moviesState;

  useEffect(() => {
    const filter = query.get('filter')
    if (filter) dispatch(setFilter(filter));
    const searchInput = query.get('searchInput');
    if (searchInput) dispatch(setSearchInput(searchInput));
    const sortBy = query.get('sortBy');
    if (sortBy) dispatch(setSortBy(SORTS_BY.filter(s => s.key === sortBy)[0]));
    const searchBy = query.get('searchBy');
    if (searchBy) dispatch(setSearchBy(searchBy as SearchByType));
    const sortOrder = query.get('sortOrder');
    if (sortOrder) dispatch(setSortOrder(sortOrder as SortOrderType));
  }, []);

  const dispatchGetMovies = () => {
    if (searchInput || filter !== 'all') {
      dispatch(
        getMovies({
          searchInput: searchInput,
          sortBy: sortBy,
          searchBy: searchBy,
          sortOrder: sortOrder,
          filter: filter
        })
      );
    } else {
      dispatch(getMoviesSuccess([]));
    }
    history.push(`?searchInput=${searchInput}&sortBy=${sortBy?.key}&searchBy=${searchBy}&sortOrder=${sortOrder}&filter=${filter}`);
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
