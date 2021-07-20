import React, { FunctionComponent, SyntheticEvent } from "react";
import { IMovieItem } from "../../types";
import styles from "./Movie.scss";
import noImage from "../../assets/noImage.png";
import { useHistory } from "react-router-dom";

export interface IMovieProps {
  item: IMovieItem;
}

export const Movie: FunctionComponent<IMovieProps> = ({
  item,
}: IMovieProps) => {
  const { id, poster_path, title, release_date, genres }: IMovieItem = item;

  const history = useHistory();

  function handleMovieClick(id) {
    history.push(`/movies/${id}`);
  }

  const handleImgOnError = (
    e: SyntheticEvent<EventTarget & HTMLImageElement>
  ): void | undefined => {
    const imgElement: HTMLImageElement = e.currentTarget;
    imgElement.src = `${noImage}`;
    return undefined;
  };

  return (
    <div className={styles.Movie} onClick={() => handleMovieClick(id)}>
      <img
        className={styles.picture}
        src={poster_path}
        onError={handleImgOnError}
      />
      <div className={styles.nameYear}>
        <div className={styles.name}>{title}</div>
        <div className={styles.year}>{release_date?.split("-")[0]}</div>
      </div>
      <div className={styles.genre}>{genres.join(" & ")}</div>
    </div>
  );
};
