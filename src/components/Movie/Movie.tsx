import React, { FunctionComponent } from 'react';
import { IMovieItem } from '../../types';
import styles from './Movie.scss';

export interface IMovieProps {
  item: IMovieItem;
}

export const Movie: FunctionComponent<IMovieProps> = ({
  item,
}: IMovieProps) => {
  const { poster_path, title, release_date, genres }: IMovieItem = item;
  return (
    <div className={styles.Movie}>
      <img className={styles.picture} src={poster_path} />
      <div className={styles.nameYear}>
        <div className={styles.name}>{title}</div>
        <div className={styles.year}>{release_date?.split('-')[0]}</div>
      </div>
      <div className={styles.genre}>{genres[0]}</div>
    </div>
  );
};
