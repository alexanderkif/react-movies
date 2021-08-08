import React, { FunctionComponent, SyntheticEvent } from "react";
import { IMovieItem } from "../../types";
import styles from "./Movie.scss";
import noImage from "../../assets/noImage.png";
import { useHistory } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from "react-redux";
import { setDialogOpened } from "../../redux/actions";

export interface IMovieProps {
  item: IMovieItem;
}

export const Movie: FunctionComponent<IMovieProps> = ({
  item,
}: IMovieProps) => {
  const { id, poster_path, title, release_date, genres }: IMovieItem = item;

  const history = useHistory();

  const dispatch = useDispatch();

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

  const editMovieHandle = () => {
    dispatch(setDialogOpened(true, item, false));
  };

  const deleteMovieHandle = () => {
    dispatch(setDialogOpened(true, item, true));
  };

  return (
    <div className={styles.Movie}>
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
        <div className={styles.year}>{release_date?.split("-")[0]}</div>
      </div>
      <div className={styles.genre} onClick={handleMovieClick}>{genres.join(" & ")}</div>
    </div>
  );
};
