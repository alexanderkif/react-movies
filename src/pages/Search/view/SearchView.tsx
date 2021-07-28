import React, { FunctionComponent } from "react";
import styles from "./Search.scss";
import CompanyLabel from "../../../components/CompanyLabel";
import MovieButton from "../../../components/MovieButton";
import ListMovies from "../../../components/ListMovies";
import { ISearchViewProps } from "../../../types";
import GenresPanel from "../../../components/GenresPanel";
import SortBySelector from "../../../components/SortBySelector";

export const SearchView: FunctionComponent<ISearchViewProps> = (
  props: ISearchViewProps
) => {
  const {
    movies,
    searchBy,
    searchInput,
    searchInputHandler,
    searchEnterHandler,
    searchByHandler,
    searches,
    fetchMovies,
    setActiveMovieHandler,
    filter
  } = props;

  return (
    <div className={styles.Search}>
      <div className={styles.Search__controls}>
        <CompanyLabel />
        <div className={styles.Search__label}>Find your movie</div>
        <div className={styles.Search__buttonsPanel}>
          <input
            className={styles.Search__input}
            type="text"
            placeholder="What do you want to watch?"
            value={searchInput}
            onChange={searchInputHandler}
            onKeyPress={searchEnterHandler}
          />
          <MovieButton text="Search" active={true} clickHandler={fetchMovies} />
        </div>
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
      </div>
      <div className={styles.Search__sort}>
        <div className={styles.Search__border_bottom}>
          <GenresPanel
            genres={['all', 'documentary', 'comedy', 'horror', 'crime']}
            setActiveMovieHandler={setActiveMovieHandler}
            activeGenre={filter}
          />
          <SortBySelector
          // sorts={sorts}
          // sortBy={sortBy}
          // sortHandler={sortHandler}
          />
        </div>
      </div>
      <div className={styles.Search__sort}>
        <div className={styles.Search__moviesFound}>
          <span>{movies && movies.length > 49 ? '50 or more' : movies?.length}</span> movies found
        </div>
      </div>
      <ListMovies movies={movies} />
    </div>
  );
};
