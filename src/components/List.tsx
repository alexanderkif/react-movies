import React from 'react';
import styles from './List.module.scss';
import Movie from './Movie';

function List(): JSX.Element {
  return (
    <div className={styles.List}>
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </div>
  );
}

export default List;
