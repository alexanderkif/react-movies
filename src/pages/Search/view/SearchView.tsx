import React, { FunctionComponent } from "react";
import styles from "./Search.scss";
import CompanyLabel from "../../../components/CompanyLabel";
import MovieButton from "../../../components/MovieButton";
import ListMovies from "../../../components/ListMovies";
import { ISearchViewProps } from "../../../types";
import GenresPanel from "../../../components/GenresPanel";
import SortBySelector from "../../SortBySelector";
import MovieDialog from "../../MovieDialog";
import { LIMIT_MOVIES_IN_SEARCH } from "../../../utils/constants";

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
    dispatchGetMovies,
    setActiveMovieHandler,
    filter,
    dialogOpened,
    openFormHandle,
  } = props;

  return (
    <div className={styles.Search}>
      <div className={styles.controls}>
        <div className={styles.topPanel}>
          <CompanyLabel />
          <button className={styles.openDialogBtn} onClick={openFormHandle}>+ ADD MOVIE</button>
        </div>
        <div className={styles.label}>Find your movie</div>
        <div className={styles.buttonsPanel}>
          <input
            className={styles.input}
            type="text"
            placeholder="What do you want to watch?"
            value={searchInput}
            onChange={searchInputHandler}
            onKeyPress={searchEnterHandler}
          />
          <MovieButton text="Search" active={true} clickHandler={dispatchGetMovies} />
        </div>
        <div className={styles.params}>
          search by
          {searches?.map((searchType) => (
            <MovieButton
              key={searchType}
              text={searchType}
              active={searchType === searchBy}
              small={true}
              clickHandler={searchByHandler}
            />
          ))}
        </div>
      </div>
      <div className={styles.sort}>
        <div className={styles.border_bottom}>
          <GenresPanel
            genres={['all', 'documentary', 'comedy', 'horror', 'crime']}
            setActiveMovieHandler={setActiveMovieHandler}
            activeGenre={filter}
          />
          <SortBySelector />
        </div>
      </div>
      {movies?.length ?
        <div className={styles.sort}>
          <div className={styles.moviesFound}>
            <span>{movies && movies.length > LIMIT_MOVIES_IN_SEARCH - 1
              ? `${LIMIT_MOVIES_IN_SEARCH} or more` : movies?.length}</span>&nbsp;movies found
          </div>
        </div> : ''}
      {movies?.length ?
        <ListMovies movies={movies} /> :
        <div className={styles.noMovieFoundWrapper}>
          <div className={styles.noMovieFound}>No Movie Found</div>
        </div>
      }
      {dialogOpened && <MovieDialog />}
    </div>
  );
};
