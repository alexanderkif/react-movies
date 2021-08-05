import { useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovies,
  setDialogOpened,
  setFilter,
  setSearchBy,
  setSearchInput
} from "../../../redux/actions";
import { IMovieState, ISearchViewProps, SearchByType } from "../../../types";
import { RootState } from "../../../redux/reducers";

const searches: SearchByType[] = ["title", "genres"];

const useSearch = (): ISearchViewProps => {

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

  const openFormHandle = (e: MouseEvent) => {
    if (dialogOpened) e.stopPropagation();
    dispatch(setDialogOpened(true, {
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
    }));
  };

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
  };

  const searchEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchMovies();
  };

  useEffect(() => {
    console.log('useSearch fetchMovies');
    fetchMovies();
  }, [sortBy, searchBy, sortOrder, filter]);

  const fetchMovies = () => {
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

  const searchByHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const index = searches
      .map((s) => s.toLocaleLowerCase())
      .indexOf(e.currentTarget.innerText.toLocaleLowerCase())
    if (index === -1) return;
    dispatch(setSearchBy(searches[index]));
  };

  const setActiveMovieHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    console.log('setActiveMovieHandler', target.innerText, filter);
    if (target.innerText.toLowerCase() === filter?.toLowerCase()) return;
    dispatch(setFilter(target.innerText.toLowerCase()));
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
    fetchMovies,
    setActiveMovieHandler,
    filter,
    dialogOpened,
    openFormHandle,
  };
};

export default useSearch;
