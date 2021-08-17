import React, { FunctionComponent, SyntheticEvent } from "react";
import { IMovieItem } from "../../types";
import styles from "./MovieDetails.scss";
import getColors from "../../utils/getColors";
import getYearFromReleaseDate from "../../utils/getYearFromReleaseDate";
import noImage from "../../assets/noImage.png";

export const MovieDetails: FunctionComponent<{ movie: IMovieItem }> = ({ movie }: { movie: IMovieItem }) => {

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.src = `${noImage}`;
    return undefined;
  };

  return (
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
          {movie && getYearFromReleaseDate(movie.release_date)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{movie?.runtime} min
        </div>
        <div className={styles.description}>
          {movie?.overview}
        </div>
      </div>
    </div>
  );
};
