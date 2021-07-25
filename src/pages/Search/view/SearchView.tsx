import React, { FunctionComponent } from "react";
import styles from "./Search.scss";
import CompanyLabel from "../../../components/CompanyLabel";
import MovieButton from "../../../components/MovieButton";
import MovieTextButton from "../../../components/MovieTextButton";
import ListMovies from "../../../components/ListMovies";
import { ISearchViewProps } from "../../../types";

export const SearchView: FunctionComponent<ISearchViewProps> = (
  props: ISearchViewProps
) => {
  const {
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
  } = props;

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
            {searches?.map((s) => (
              <MovieButton
                key={s}
                text={s}
                active={s === searchBy}
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
          {movies && movies.length > 49 ? '50 or more' : movies?.length} movies found
        </div>
        <div className={styles.Search__sortBy} onClick={sortHandler}>
          <div className={styles.Search__sortLabel}>Sort by</div>
          {sorts?.map((s) => (
            <MovieTextButton
              key={s.key}
              text={s.name}
              active={s.key === sortBy?.key}
            />
          ))}
        </div>
      </div>
      <ListMovies movies={movies} />
    </div>
  );
};
