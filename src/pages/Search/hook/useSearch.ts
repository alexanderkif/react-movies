import { useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovies,
  setSearchBy,
  setSearchInput,
  setSortBy,
  setSortOrder
} from "../../../redux/actions";
import { IMovieState, ISearchViewProps, SearchByType, SortByType } from "../../../types";
import { RootState } from "../../../redux/reducers";

const useSearch = (): ISearchViewProps => {

  const sorts: SortByType[] = [
    { key: 'vote_average', name: 'rating' },
    { key: 'release_date', name: 'release date' }
  ];
  const searches: SearchByType[] = ["title", "genres"];

  const dispatch = useDispatch();
  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { movies } = moviesReducer;
  const { searchBy, searchInput, sortBy, sortOrder }: IMovieState = moviesReducer;

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(e.target.value));
  };

  const searchEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [sortBy, searchBy, sortOrder]);

  const fetchMovies = () => {
    dispatch(
      getMovies({
        searchInput: searchInput,
        sortBy: sortBy,
        searchBy: searchBy,
        sortOrder: sortOrder,
      })
    );
  };

  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const index = sorts
      .map((s) => s.name.toLocaleLowerCase())
      .indexOf(target.innerText.toLocaleLowerCase())
    if (index === -1) return;
    if (target.innerText === sortBy?.name) {
      toggleSortOrder();
    } else {
      dispatch(setSortBy(sorts[index]));
    }
  };

  const toggleSortOrder = () => {
    dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
  }

  const searchByHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const index = searches
      .map((s) => s.toLocaleLowerCase())
      .indexOf(e.currentTarget.innerText.toLocaleLowerCase())
    if (index === -1) return;
    dispatch(setSearchBy(searches[index]));
  };

  return {
    movies,
    searchBy,
    sortBy,
    searchInput,
    searchInputHandler,
    searchEnterHandler,
    searchByHandler,
    sortHandler,
    sorts,
    searches,
    fetchMovies
  };
};

export default useSearch;
