import React, { FunctionComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovies, setSearchBy, setSearchInput, setSortBy } from "../../redux/actions";
import styles from "./Search.scss";
import CompanyLabel from "../../components/CompanyLabel";
import MovieButton from "../../components/MovieButton";
import MovieTextButton from "../../components/MovieTextButton";
import { IListMoviesProps } from "../../types";
import ListMovies from "../../components/ListMovies";

const sorts = [
  { name: "release date", key: "release_date" },
  { name: "rating", key: "vote_average" },
];

const searches = [
  { name: "title", key: "title" },
  { name: "genre", key: "genres" },
];

export const Search: FunctionComponent = () => {

  const dispatch = useDispatch();
  const moviesReducer = useSelector(state => state.moviesReducer);
  const { movies }: { movies: IListMoviesProps } = moviesReducer;
  const { searchBy }: { searchBy: string } = moviesReducer;
  const { searchInput }: { searchInput: string } = moviesReducer;
  const { sortBy }: { sortBy: string } = moviesReducer;

  const searchInputHandler = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  const searchEnterHandler = (e) => {
    if (e.key === "Enter") fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, [sortBy, searchBy]);

  const fetchMovies = () => {
    dispatch(
      getMovies({
        search: searchInput,
        sortBy: sorts.filter((s) => s.name === sortBy)[0].key,
        searchBy: searches.filter((s) => s.name === searchBy)[0].key,
      })
    );
  };

  const sortHandler = (e) => {
    if (sorts.map((s) => s.name).includes(e.target.innerText))
      dispatch(setSortBy(e.target.innerText));
  };

  const searchByHandler = (e) => {
    if (
      searches
        .map((s) => s.name.toLocaleLowerCase())
        .includes(e.target.innerText.toLocaleLowerCase())
    ) {
      dispatch(setSearchBy(e.target.innerText.toLocaleLowerCase()));
    }
  };

  return (
    <div className={styles.Search}>
      <div className={styles.Search__controls}>
        <CompanyLabel />
        <div className={styles.Search__label}>Find your movie</div>
        <input
          className={styles.Search__input}
          type="text"
          value={searchInput}
          onChange={searchInputHandler}
          onKeyPress={searchEnterHandler}
        />
        <div className={styles.Search__buttonsPanel}>
          <div className={styles.Search__params}>
            search by
            {searches.map((s) => (
              <MovieButton
                key={s.key}
                text={s.name}
                active={s.name === searchBy}
                small={true}
                clickHandler={searchByHandler}
              />
            ))}
          </div>
          <MovieButton text="Search" active={true} clickHandler={fetchMovies} />
        </div>
      </div>
      <div className={styles.Search__sort}>
        <div className={styles.Search__moviesFound}>
          {movies.length > 49 ? '50 or more' : movies.length} movies found
        </div>
        <div className={styles.Search__sortBy} onClick={sortHandler}>
          <div className={styles.Search__sortLabel}>Sort by</div>
          {sorts.map((s) => (
            <MovieTextButton
              key={s.key}
              text={s.name}
              active={s.name === sortBy}
            />
          ))}
        </div>
      </div>
      <ListMovies movies={movies} />
    </div>
  );
};
