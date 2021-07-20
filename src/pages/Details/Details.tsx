import React, { FunctionComponent, SyntheticEvent, useEffect } from "react";
import styles from "./Details.scss";
import { useParams, Link } from "react-router-dom";
import CompanyLabel from "../../components/CompanyLabel";
import { IMovieItem } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { getMovieById } from "../../redux/actions";
import noImage from "../../assets/noImage.png";

export const Details: FunctionComponent = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const moviesReducer = useSelector(state => state.moviesReducer);
  const { movie }: { movie: IMovieItem } = moviesReducer;

  useEffect(() => {
    dispatch(
      getMovieById({ id: id })
    );
  }, []);

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.src = `${noImage}`;
    return undefined;
  };

  const getColors = (vote) => {
    const red = Math.round(200 - vote * 12);
    const green = Math.round(vote * 12 + 80);
    return {
      color: `rgba(${red},${green},0,1)`,
      borderColor: `rgba(${red},${green},0,1)`
    }
  }

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
        <div className={styles.Details__filmsBy}>
          Films by {movie?.genres.join(' & ')} {movie?.genres.length > 1 ? 'genres' : 'genre'}
        </div>
      </div>
      {/* <ListMovies movies={movies} /> */}
    </div>
  );
};
