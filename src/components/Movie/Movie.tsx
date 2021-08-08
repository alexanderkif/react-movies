import React, { FunctionComponent, SyntheticEvent, MouseEvent } from "react";
import { IMovieItem, IMovieState } from "../../types";
import styles from "./Movie.scss";
import noImage from "../../assets/noImage.png";
import { useHistory } from "react-router-dom";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
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

  const moviesReducer = useSelector((state: RootState) => state.moviesReducer);
  const { dialogOpened }: IMovieState = moviesReducer;

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

  const editMovieHandle = (e: MouseEvent) => {
    if (!dialogOpened) e.stopPropagation();
    dispatch(setDialogOpened(true, item));
  };

  return (
    <div className={styles.Movie} onClick={handleMovieClick}>
      <img
        className={styles.picture}
        src={poster_path}
        onError={handleImgOnError}
      />
      <div className={styles.edit} onClick={editMovieHandle}>
        <MoreVertIcon />
      </div>
      <div className={styles.nameYear}>
        <div className={styles.name}>{title}</div>
        <div className={styles.year}>{release_date?.split("-")[0]}</div>
      </div>
      <div className={styles.genre}>{genres.join(" & ")}</div>
    </div>
  );
};
