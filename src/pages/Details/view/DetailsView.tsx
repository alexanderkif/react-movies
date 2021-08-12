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
import getColors from "../../../utils/getColors";
import { LIMIT_MOVIES_IN_DETAILS } from "../../../utils/constants";

export const DetailsView: FunctionComponent<IDetailViewParams> = (
  props: IDetailViewParams
) => {
  const { dialogOpened, movie, moviesByGenre, activeGenreDetails, setActiveMovieHandler } = props;

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.src = `${noImage}`;
    return undefined;
  };

  return (
    <div className={styles.Details}>
      <div className={styles.backgrounded}>
        <div className={styles.bgDark}>
          <div className={styles.topBar}>
            <CompanyLabel />
            <Link className={styles.linkToSearch} to="/">
              <SearchIcon />
            </Link>
          </div>
          <div className={styles.movie}>
            <img
              src={movie?.poster_path}
              className={styles.picture}
              onError={handleImgOnError}
            />
            <div className={styles.texts}>
              <div className={styles.title}>
                {movie?.title}
                <div
                  className={styles.average}
                  style={getColors(movie?.vote_average as number)}
                >
                  {movie?.vote_average}
                </div>
              </div>
              <div className={styles.tagline}>
                {movie?.tagline}
              </div>
              <div className={styles.yearLength}>
                {movie?.release_date.split('-')[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{movie?.runtime} min
              </div>
              <div className={styles.description}>
                {movie?.overview}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.border_bottom}>
          <GenresPanel
            genres={movie?.genres}
            setActiveMovieHandler={setActiveMovieHandler}
            activeGenre={activeGenreDetails}
          />
          <SortBySelector />
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={styles.moviesFound}>
          <span>{moviesByGenre && moviesByGenre.length > LIMIT_MOVIES_IN_DETAILS - 1
            ? `${LIMIT_MOVIES_IN_DETAILS} or more` : moviesByGenre?.length}</span>&nbsp;movies found
        </div>
      </div>
      <ListMovies movies={moviesByGenre} />
      {dialogOpened && <MovieDialog />}
    </div>
  );
};
