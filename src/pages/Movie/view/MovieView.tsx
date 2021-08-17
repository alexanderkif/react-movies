import React, { FunctionComponent } from "react";
import { IMovieItem, IUseMovie, IUseMovieProps } from "../../../types";
import styles from "./Movie.scss";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import getYearFromReleaseDate from "../../../utils/getYearFromReleaseDate";

export interface IMovieProps {
  item: IMovieItem;
}

export const MovieView: FunctionComponent<IUseMovieProps> = (props: IUseMovieProps) => {
  const { id, poster_path, title, release_date, genres }: IMovieItem = props.movie;
  const {
    handleMovieClick,
    editMovieHandle,
    deleteMovieHandle,
    handleImgOnError
  }: IUseMovie = props;

  return (
    <div className={styles.card}>
      <img
        className={styles.picture}
        src={poster_path}
        onError={handleImgOnError}
        onClick={() => handleMovieClick(id)}
      />
      <div className={styles.edit} onClick={() => editMovieHandle(props.movie)}>
        <MoreVertIcon />
      </div>
      <div className={styles.delete} onClick={() => deleteMovieHandle(props.movie)}>
        <DeleteIcon />
      </div>
      <div className={styles.nameYear} onClick={() => handleMovieClick(id)}>
        <div className={styles.name}>{title}</div>
        <div className={styles.year}>{getYearFromReleaseDate(release_date)}</div>
      </div>
      <div className={styles.genre} onClick={() => handleMovieClick(id)}>{genres.join(" & ")}</div>
    </div>
  );
};
