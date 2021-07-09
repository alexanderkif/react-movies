import React from 'react';
import styles from './Movie.module.scss';

function Movie(): JSX.Element {
  const card = {
    id: 337167,
    title: 'Fifty Shades Freed',
    tagline: `Don't miss the climax`,
    vote_average: 6.1,
    vote_count: 1195,
    release_date: '2018-02-07',
    poster_path:
      'https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg',
    overview: `Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.`,
    budget: 55000000,
    revenue: 136906000,
    genres: ['Drama', 'Romance'],
    runtime: 106,
  };

  return (
    <div className={styles.Movie}>
      <img className={styles.Movie__picture} src={card.poster_path} />
      <div className={styles.Movie__nameYear}>
        <div className={styles.Movie__name}>{card.title}</div>
        <div className={styles.Movie__year}>
          {card.release_date.split('-')[0]}
        </div>
      </div>
      <div className={styles.Movie__genre}>{card.genres[0]}</div>
    </div>
  );
}

export default Movie;
