import React, { FunctionComponent, SyntheticEvent } from "react";
import styles from "./Details.scss";
import { Link } from "react-router-dom";
import CompanyLabel from "../../../components/CompanyLabel";
import noImage from "../../../assets/noImage.png";
import ListMovies from "../../../components/ListMovies";
import { IDetailViewParams } from "../../../types";
import MovieTextButton from "../../../components/MovieTextButton";

export const DetailsView: FunctionComponent<IDetailViewParams> = (
  props: IDetailViewParams
) => {
  const { movie, moviesByGenre, activeGenre, setActiveMovieHandler } = props;

  const getColors = (vote) => {
    const red = Math.round(200 - vote * 12);
    const green = Math.round(vote * 12 + 80);
    return {
      color: `rgba(${red},${green},0,1)`,
      borderColor: `rgba(${red},${green},0,1)`
    }
  }

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
            <Link className={styles.Details__linkToSearch} to="/">Search</Link>
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
                  style={getColors(movie?.vote_average)}
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
        <div className={styles.Details__filmsBy} onClick={setActiveMovieHandler}>
          Films by {movie?.genres.map((g) => (
            <div key={g} className={styles.Details__filmsByBtns}>
              <span style={movie?.genres[0] === g ? { display: 'none' } : {}}>&</span>
              <MovieTextButton
                text={g}
                active={g === activeGenre}
              />
            </div>
          ))} {movie && movie.genres.length > 1 ? 'genres' : 'genre'}
        </div>
      </div>
      <ListMovies movies={moviesByGenre} />
    </div>
  );
};
