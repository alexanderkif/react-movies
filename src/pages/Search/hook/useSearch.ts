import { useEffect, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { ISearchViewProps, IUseSearchProps, SearchByType } from "../../../types";

const searches: SearchByType[] = ["title", "genres"];

const useSearch = (props: IUseSearchProps): ISearchViewProps => {

  const {
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
  } = props;

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
    dispatchSetDialogOpened(true, newMovie);
  };

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchSetSearchInput(e.target.value);
  };

  const searchEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") dispatchGetMovies();
  };

  useEffect(() => {
    dispatchGetMovies();
  }, [sortBy, searchBy, sortOrder, filter]);

  const searchByHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const index = searches
      .map((s) => s.toLowerCase())
      .indexOf(e.currentTarget.innerText.toLowerCase())
    if (index === -1) return;
    dispatchSetSearchBy(searches[index]);
  };

  const setActiveMovieHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.innerText.toLowerCase() === filter?.toLowerCase()) return;
    dispatchSetFilter(target.innerText.toLowerCase());
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
