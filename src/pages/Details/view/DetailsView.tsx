import React, { FunctionComponent, SyntheticEvent } from "react";
import styles from "./Details.scss";
import { Link } from "react-router-dom";
import CompanyLabel from "../../../components/CompanyLabel";
import noImage from "../../../assets/noImage.png";
import ListMovies from "../../../components/ListMovies";
import { IDetailViewParams } from "../../../types";
import GenresPanel from "../../../components/GenresPanel";
import SearchIcon from '@material-ui/icons/Search';
import SortBySelector from "../../../components/SortBySelector";
import MovieDialog from "../../../components/MovieDialog";

export const DetailsView: FunctionComponent<IDetailViewParams> = (
  props: IDetailViewParams
) => {
  const { dialogOpened, movie, moviesByGenre, activeGenreDetails, setActiveMovieHandler, getColors } = props;

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.src = `${noImage}`;
    return undefined;
  };

  return (
    <div className={styles.Details}>
      <div className={styles.Details__backgrounded}>
        <div className={styles.Details__bgDark}>
          <div className={styles.Details__topBar}>
            <CompanyLabel />
            <Link className={styles.Details__linkToSearch} to="/">
              <SearchIcon />
            </Link>
          </div>
          <div className={styles.Details__movie}>
            <img
              src={movie?.poster_path}
              className={styles.Details__picture}
              onError={handleImgOnError}
            />
            <div className={styles.Details__texts}>
              <div className={styles.Details__title}>
                {movie?.title}
                <div
                  className={styles.Details__average}
                  style={getColors(movie?.vote_average as number)}
                >
                  {movie?.vote_average}
                </div>
              </div>
              <div className={styles.Details__tagline}>
                {movie?.tagline}
              </div>
              <div className={styles.Details__yearLength}>
                {movie?.release_date.split('-')[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{movie?.runtime} min
              </div>
              <div className={styles.Details__description}>
                {movie?.overview}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Details__bottomBar}>
        <div className={styles.Details__border_bottom}>
          <GenresPanel
            genres={movie?.genres}
            setActiveMovieHandler={setActiveMovieHandler}
            activeGenre={activeGenreDetails}
          />
          <SortBySelector />
        </div>
      </div>
      <div className={styles.Details__bottomBar}>
        <div className={styles.Details__moviesFound}>
          <span>{moviesByGenre && moviesByGenre.length > 24 ? '25 or more' : moviesByGenre?.length}</span>&nbsp;movies found
        </div>
      </div>
      <ListMovies movies={moviesByGenre} />
      {dialogOpened && <MovieDialog />}
    </div>
  );
};
