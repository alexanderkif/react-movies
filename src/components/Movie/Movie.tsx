import React, { FunctionComponent, SyntheticEvent } from "react";
import { IMovieItem } from "../../types";
import styles from "./Movie.scss";
import noImage from "../../assets/noImage.png";
import { useHistory } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import getYearFromReleaseDate from "../../utils/getYearFromReleaseDate";
import { useMovieDialogOpen } from "../MovieDialog/MovieDialog";

export interface IMovieProps {
  item: IMovieItem;
}

export const Movie: FunctionComponent<IMovieProps> = ({
  item,
}: IMovieProps) => {
  const { id, poster_path, title, release_date, genres }: IMovieItem = item;

  const history = useHistory();

  const openMovieDialog = useMovieDialogOpen();

  const editMovieHandle = () => {
    openMovieDialog(true, item, false);
  };

  const deleteMovieHandle = () => {
    openMovieDialog(true, item, true);
  };

  function handleMovieClick() {
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
    <div className={styles.card}>
      <img
        className={styles.picture}
        src={poster_path}
        onError={handleImgOnError}
        onClick={handleMovieClick}
      />
      <div className={styles.edit} onClick={editMovieHandle}>
        <MoreVertIcon />
      </div>
      <div className={styles.delete} onClick={deleteMovieHandle}>
        <DeleteIcon />
      </div>
      <div className={styles.nameYear} onClick={handleMovieClick}>
        <div className={styles.name}>{title}</div>
        <div className={styles.year}>{getYearFromReleaseDate(release_date)}</div>
      </div>
      <div className={styles.genre} onClick={handleMovieClick}>{genres.join(" & ")}</div>
    </div>
  );
};
