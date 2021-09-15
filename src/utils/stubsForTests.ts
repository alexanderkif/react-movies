import { IMovieItem, IMovieState } from '../types';

export const stubMovie1: IMovieItem = {
  id: 962,
  title: 'The Gold Rush',
  tagline: "The World's Greatest Laughing Picture!",
  vote_average: 7.8,
  vote_count: 411,
  release_date: '1925-06-25',
  poster_path:
    'https://image.tmdb.org/t/p/w500/eQRFo1qwRREYwj47Yoe1PisgOle.jpg',
  overview:
    'A lone prospector ventures into Alaska looking for gold. He gets mixed up with some burly characters and falls in love with the beautiful Georgia. He tries to win her heart with his singular charm.',
  budget: 923000,
  revenue: 2500000,
  genres: ['Adventure', 'Comedy', 'Drama'],
  runtime: 95,
};

export const stubMovie2: IMovieItem = {
  id: 872,
  title: "Singin' in the Rain",
  tagline: 'What a Glorious Feeling!',
  vote_average: 8,
  vote_count: 959,
  release_date: '1952-04-10',
  poster_path:
    'https://image.tmdb.org/t/p/w500/iQpOyAgbUzbO6Coh9OiHRxXjx2Y.jpg',
  overview:
    'In 1927 Hollywood, a silent film production company and cast make a difficult transition to sound.',
  budget: 2540800,
  revenue: 7200000,
  genres: ['Comedy', 'Music', 'Romance'],
  runtime: 103,
};

export const stubMoviesState: IMovieState = {
  movies: [stubMovie1, stubMovie2],
  movie: stubMovie1,
  editMovie: stubMovie2,
  searchBy: 'title',
  sortBy: { key: 'release_date', name: 'release date' },
  searchInput: '',
  sortOrder: 'asc',
  moviesByGenre: [],
  activeGenreDetails: 'Adventure',
  filter: '',
  dialogOpened: false,
  deleteMovie: false,
};
