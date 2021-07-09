import React, { useState } from 'react';
import styles from './Search.module.scss';
import List from '../components/List';
import CompanyLabel from '../components/CompanyLabel';
import MovieButton from '../components/MovieButton';

function Search(): JSX.Element {
  const [searchInput, setSearchInput] = useState('Quentin Tarantino');
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.Search}>
      <div className={styles.Search__controls}>
        <CompanyLabel />
        <div className={styles.Search__label}>Find your movie</div>
        <input
          className={styles.Search__input}
          type="text"
          value={searchInput}
          onChange={searchInputHandler}
        />
        <div className={styles.Search__buttonsPanel}>
          <div className={styles.Search__params}>
            search by
            <MovieButton text="Title" active={true} small={true} />
            <MovieButton text="Genre" small={true} />
          </div>
          <MovieButton text="Search" active={true} />
        </div>
      </div>
      <div className={styles.Search__sort}>7 movies found</div>
      <List />
    </div>
  );
}

export default Search;
